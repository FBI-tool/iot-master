const mongo = require_plugin("mongodb");
const _ = require("lodash");

/**
 * 创建接口
 * @param col
 * @param {function(*)|undefined} before
 * @returns {(function(*): Promise<void>)}
 */
exports.create = function (col, before) {
    return async ctx => {
        if (typeof before === 'function')
            before(ctx)

        const body = ctx.request.body;
        delete body._id;
        //body.user_id = ctx.state.user._id; 由前端来补充
        const ret = await mongo.db.collection(col).insertOne(body);
        ctx.body = {data: ret.insertedId};

        //后续执行
        process.nextTick(async () => {
            //记录创建事件
            await mongo.db.collection('event').insertOne({
                target: col,
                [col + '_id']: ctx.params._id,
                event: '创建',
                user_id: ctx.state.user && ctx.state.user._id,
            });
        });
    }
}

exports.setting = function (col, before) {
    return async ctx => {
        if (typeof before === 'function')
            before(ctx)

        const body = ctx.request.body;
        delete body._id; //ID不能修改，MongoDB会报错
        const ret = await mongo.db.collection(col).findOneAndUpdate({_id: ctx.params._id}, {$set: body});
        ctx.body = {data: ret};

        //后续执行
        process.nextTick(async () => {
            //复制原始数据
            const value = _.clone(ret.value);
            delete value._id;
            value[col + '_id'] = ctx.params._id;

            //备份原始的数据
            await mongo.db.collection(col + '_history').insertOne(value)

            //计算差异
            const modify = {};
            for (let k in body) {
                if (!body.hasOwnProperty(k)) continue;
                if (!_.isEqual(body[k], ret.value[k]))
                    modify[k] = body[k];
            }

            //记录修改事件
            await mongo.db.collection('event').insertOne({
                target: col,
                [col + '_id']: ctx.params._id,
                event: '修改',
                data: modify,
                user_id: ctx.state.user && ctx.state.user._id,
            })
        });
    }
}

exports.detail = function (col, before) {
    return async ctx => {
        if (typeof before === 'function')
            before(ctx)

        const res = await mongo.db.collection(col).findOne({_id: ctx.params._id});
        if (res) ctx.body = {data: res}
        else ctx.body = {error: '找不到数据'}
    }
}

exports.delete = function (col, before) {
    return async ctx => {
        if (typeof before === 'function')
            before(ctx)

        const res = await mongo.db.collection(col).findOneAndDelete({_id: ctx.params._id});
        ctx.body = {data: res}

        //后续执行
        process.nextTick(async () => {
            const value = _.clone(res.value);
            delete value._id;
            value[col + '_id'] = ctx.params._id;

            //备份删除的数据
            await mongo.db.collection(col + '_deleted').insertOne(value);
            //记录删除事件
            await mongo.db.collection('event').insertOne({
                target: col,
                [col + '_id']: ctx.params._id,
                event: '删除',
                user_id: ctx.state.user && ctx.state.user._id,
            });
        });
    }
}


exports.list = function (col, options) {
    options = options || {};

    return async ctx => {
        if (typeof options.before === 'function')
            options.before(ctx)

        const body = ctx.request.body || {};

        let pipeline = [
            {$match: body.filter || {}},
            {$sort: body.sort || {_id: -1}},
            {$skip: body.skip || 0},
            {$limit: body.limit || 20},
            //TODO project
        ];

        if (options.pipeline) {
            pipeline = pipeline.concat(pipeline)
        }

        function addJoin(join) {
            const $lookup = {
                from: join.from,
                as: join.as || join.from,
                localField: join.local || join.from + '_id',
                foreignField: join.foreign || '_id'
            };
            pipeline.push({$lookup});
            pipeline.push({$unwind: {path: '$' + $lookup.as, preserveNullAndEmptyArrays: true}});
            if (join.replace) {
                pipeline.push({$addFields: {[$lookup.as + '.'+ col + '_id']: '$_id'}})
                pipeline.push({$replaceRoot: {newRoot: '$' + $lookup.as}});
            }
        }

        options.join && addJoin(options.join)
        options.joins && joins.forEach(addJoin)

        if (options.fields) {
            pipeline.push({$project: options.fields})
        }

        const stages = [
            {$match: body.filter || {}},
            {$count: 'total'},
            {
                $lookup: {
                    from: col,
                    as: 'data',
                    pipeline
                }
            }
        ]

        //查询
        const res = await mongo.db.collection(col).aggregate(stages).toArray();
        if (res.length > 0) {
            ctx.body = res[0];
        } else {
            ctx.body = {total: 0, data: []}
        }
    }
}
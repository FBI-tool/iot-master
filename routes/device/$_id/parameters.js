const mongo = require_plugin("mongodb");
const dvc = require("../../../lib/device");

exports.get = async ctx=>{
    const device = await mongo.db.collection("device").findOne({_id: ctx.params._id});
    ctx.body = {data: device.parameters || {}};
}

exports.post = async ctx => {
    const body = ctx.request.body;
    const device = dvc.get(ctx.params._id)
    if (device)
        Object.assign(device.context, body);
    //device.context.set(body);
    //更新到数据库
    mongo.db.collection("device").updateOne({_id: ctx.params._id}, {$set: {parameters: body}}).then(res => {
    })

    ctx.body = {data:""}
}

const mongo = require_plugin("mongodb");
const prj = require("../../../lib/project");


exports.get = async ctx=>{
    const project = await mongo.db.collection("project").findOne({_id: ctx.params._id});
    ctx.body = {data: project.parameters || {}};
}

exports.post = async ctx => {
    const body = ctx.request.body;
    const project = prj.get(ctx.params._id)
    if (project)
        Object.assign(project.context, body);
    //device.context.set(body);
    //更新到数据库
    mongo.db.collection("project").updateOne({_id: ctx.params._id}, {$set: {parameters: body}}).then(res => {
    })

    ctx.body = {data:""}
}

const curd = require_plugin("curd");
exports.post = curd.list("device_event", {
    name: 'string',
}, ctx => {
    //强制修改为
    const body = ctx.request.body;
    const filter = {key: "device_id", value: ctx.params._id};
    body.filter = body.filter || [];
    body.filter.push(filter);
});
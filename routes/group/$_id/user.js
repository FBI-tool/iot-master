const curd = require_plugin("curd");
exports.post = curd.list("member", {
    before: ctx=>{
        const body = ctx.request.body;
        body.filter.group_id = ctx.params._id;
    },
    join:{
        from: 'user',
        replace: true
    }
});
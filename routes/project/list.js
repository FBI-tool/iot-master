const curd = require_plugin("curd");
exports.post = curd.list("project", {
    joins: [{
        from: 'template',
        fields: ['name']
    }]
});
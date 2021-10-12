const EventEmitter = require("events");
const script = require("./script");
const _ = require("lodash");

module.exports = class Strategy extends EventEmitter {
    model;

    //context
    context;

    condition;
    script;

    start = 0;

    reported = false;

    constructor(model, context) {
        super();
        this.model = model;
        this.context = context;

        this.condition = script.compile(model.condition);

        //预编译参数数组
        if (model.parameters)
            this.script = script.compile('[' + model.parameters + ']')
    }

    execute() {
        try {
            //const ctx = _.cloneDeep(this.context) //Object.assign({}, this.variables, this.variables.values())
            const ret = this.condition.runInNewContext(this.context);
            if (!ret) {
                this.start = 0;//去掉发生时间，重置延时
                this.reported = false;//去掉已经上报标识
                return;
            }
        } catch (err) {
            //this.error = err.message;
            //log.error(err.message) 日志太多
            this.emit('error', err);
            return;
        }
        //以下是不合法处理逻辑

        //延时处理，发生时间，当前时间
        const now = Date.now() * 0.001; //转换成秒
        if (this.model.delay) {
            if (!this.start) {
                this.start = now;
                return;
            }
            if (this.start + this.model.delay > now)
                return;
        }

        //已经上报，则不再上报
        if (this.reported) {
            //重置逻辑
            return;
        }
        this.reported = true;

        let params = [];
        if (this.script)
            params = this.script.runInNewContext(this.context) //_.cloneDeep(this.context));

        //交给外面执行
        this.emit('execute', this.model.command, params);
    }
}
const EventEmitter = require("events");
const cron = require("./cron");

module.exports = class Job extends EventEmitter {
    model;
    variables;

    script;

    constructor(model, variables) {
        super();

        this.model = model;
        this.variables = variables;


        this.start();
    }

    start() {
        if (this.cronHandle)
            this.cronHandle.cancel();

    	this.cronHandle = cron.schedule(model.crontab, () => {
            try {
                this.script.runInNewContext(this.variables);
            } catch (err) {
                //log.error(err.message)
                this.emit('error', err);
            }
        })
    }

    cancel() {
        if (this.cronHandle)
            this.cronHandle.cancel();
        this.cronHandle = undefined;
    }
}
export default class CommandRegistry {

    constructor () {

        this.cmds = [];

    }

    static commandKey (cmd) {
        return `${cmd}-cmd`;
    }

    register (cmd, description, handler) {

        var usage = cmd;
        cmd = cmd.split(/\s+/)[0];

        this.cmds.push(cmd);

        this[CommandRegistry.commandKey(cmd)] = {
            usage: usage,
            description: description,
            handler: handler,
        };

        return this;

    }

    listAll () {
        return this.cmds.slice(0);
    }

    run (cmd, xublitCli) {

        if (this.cmds.indexOf(cmd) < 0) {
            throw new Error(`Unrecognised command "${cmd}"`);
        }

        var CommandHandler = this[CommandRegistry.commandKey(cmd)].handler;
        var command = new CommandHandler(xublitCli);

        command.run();

    }

}

import colors from 'colors/safe';

var CHECK = '✔';
var CROSS = '✘';
var SKULL = '☠';
var WARNING = '⚠';

export default class CliCommand {

    constructor (xublitCli) {

        initProps(this, xublitCli);

    }

    writeToStdout (string) {
        process.stdout.write(string);
    }

    writeToStderr (string) {
        process.stderr.write(string);
    }

    debug (error) {
        
        if (true !== this.debugOn) {
            return;
        }

        this.writeToStdout(String(error.stack) + '\n');

    }

    log (color, message) {
        message = [...arguments].slice(1).join(' ');
        this.writeToStdout(colors[color || 'white'](message) + '\n');
    }

    reportSuccess (message) {
        this.log('green', CHECK, [...arguments].join(' '));
    }

    reportWarning (message) {
        this.log('yellow', WARNING, [...arguments].join(' '));
    }

    reportFailure (message) {
        this.log('red', CROSS, [...arguments].join(' '));
    }

    critical (message) {
        this.log('red', SKULL, [...arguments].join(' '));
        process.exit(1);
    }

    run () {
        throw newAbstractMethodError(this, 'run');
    }

}

function initProps (cliCommand, xublitCli) {

    var argv = [...process.argv].slice(3);

    Object.defineProperties(cliCommand, {

        xublitCli: {
            value: xublitCli,
        },

        cmdArgs: {
            get: function () {
                return argv.filter((arg) => {

                    if ('-' === arg.substr(0, 1)) {
                        return false;
                    }

                    return true;

                });
            },
        },

        options: {
            get: function () {
                return argv.filter((arg) => {

                    if ('-' !== arg.substr(0, 1)) {
                        return false;
                    }

                    return true;

                });
            },
        },

        debugOn: {
            get: function () {
                return cliCommand.options.indexOf('--debug') > -1;
            },
        },

    });

}

function newAbstractMethodError (cliCommand, methodName) {
    
    let className = cliCommand.constructor.name;
    
    return new Error(
        `Abstract method ${methodName} not implemented in ${className}`
    );
    
}

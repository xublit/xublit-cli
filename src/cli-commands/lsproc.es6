import colors from 'colors/safe';

import DurationRenderer from '../utils/renderers/duration';

import CliCommand from './abstract';

export default class LsprocCommand extends CliCommand {

    constructor (xublitCli) {

        super(xublitCli);

    }

    run () {

        var durationRenderer = new DurationRenderer();

        var running = this.xublitCli.processManager.running;
        var numRunning = running.length;

        var renderedNumRunning = colors.green(numRunning);
        var runningProcesses = numRunning === 1 ?
            ` running process` :
            ` running processes`;

        process.stdout.write(
            `\n  ${renderedNumRunning} ${runningProcesses}`
        );

        if (numRunning < 1) {
            return;
        }

        running.forEach(function (proc) {

            let xublitPid = colors.blue(proc.xublitPid);
            let appRootPath = colors.grey(proc.appRoot);
            let uptime = durationRenderer.render(proc.uptime);

            process.stdout.write(`\n` +
                `\n    ${xublitPid}` + 
                `\n    ${appRootPath}\n` +
                `\n      (PID)    ${proc.pid}` + 
                `\n      (Uptime) ${uptime}`

            );

        });

        process.stdout.write('\n');

    }

}

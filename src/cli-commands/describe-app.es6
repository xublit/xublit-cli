import colors from 'colors/safe';
import * as util from 'util';

import CliCommand from './abstract';

export default class DescribeAppCommand extends CliCommand {

    constructor (xublitCli) {

        super(xublitCli);

    }

    run () {

        this.xublitCli.assertXublitAppInPwd();

        var app = this.xublitCli.app;
        var pkg = app.npmConfig;
        
        var stats = app.calcStats();

        process.stdout.write(colors.bold.yellow(
            `\n  /**` +
            `\n   * ${pkg.name} - v${pkg.version}` +
            `\n   */\n`
        ));

        process.stdout.write(
            '\n  ' + colors.underline('File stats:') +
            '\n\n'
        );

        Object.keys(stats).forEach(function (key) {
            
            let renderedValue = colors.green(colors.bold(stats[key]));
            let renderedKey = colors.white(key);

            process.stdout.write(
                `     ${renderedValue}   ${renderedKey}\n`
            );
            
        });

        process.stdout.write('\n');

    }

}

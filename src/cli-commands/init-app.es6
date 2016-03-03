import * as util from 'util';
import CliCommand from './abstract';

import { AppInitialiser } from '../cli-tools/app-initialiser';

export default class InitAppCommand extends CliCommand {

    constructor (xublitCli) {

        super(xublitCli);

    }

    run () {

        var appInitialiser = new AppInitialiser(this.xublitCli);

        bindInitEventListeners(this, appInitialiser);

        appInitialiser.interactive();

    }

}

function bindInitEventListeners (initAppCommand, appInitialiser) {

    appInitialiser.on('abort', function (reason) {

        if (reason) {
            initAppCommand.log('white', reason);
        }

        initAppCommand.reportWarning('App init aborted');

        process.exit(1);

    });

    appInitialiser.on('complete', function (appName) {

        initAppCommand.reportSuccess(util.format(
            'Xublit app %s successfully initialised', appName
        ));

        process.exit();

    });

    appInitialiser.on('criticalError', function (error) {
        
        var errorType = error.constructor.name;
        var errorMessage = error.message;

        initAppCommand.reportFailure('App init failed:', errorMessage);
        
        initAppCommand.writeToStderr(error.stack);

        process.exit(1);

    });

    appInitialiser.on('initialising', function () {
        initAppCommand.log('cyan', '\nInitialising Xublit app...\n');
    });

    appInitialiser.on('successfulAction', function (details) {
        initAppCommand.reportSuccess(details);
    });

}

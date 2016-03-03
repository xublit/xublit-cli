import CliCommand from './abstract';

export default class RunAppCommand extends CliCommand {

    constructor (xublitCli) {

        super(xublitCli);

    }

    run () {

        this.assertInAppDir();

        this.attemptToStartApp();

    }

    assertInAppDir () {

        try {
            this.xublitCli.assertXublitAppInPwd();
        }
        catch (error) {
            this.startFailed(
                'NotInAppDir', 
                'Xublit application not found in current dir'
            );
        }

    }

    attemptToStartApp () {

        let appName = this.xublitCli.app.npmConfig.name;
        let startMessage = `Starting ${appName} application...`;

        this.log('white', startMessage);
        
        try {
            this.xublitCli.app.start();
        }
        catch (error) {

            this.debug(error);

            this.startFailed(error.constructor.name, error.message);

        }
        
    }

    startFailed (errorType, message) {
            
        this.reportFailure(
            `Failed to start application - ${errorType}: ${message}`
        );
        
        process.exit(1);

    }

}

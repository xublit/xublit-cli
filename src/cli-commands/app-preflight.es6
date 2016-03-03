import CliCommand from './abstract';

export default class AppPreflightCommand extends CliCommand {

    constructor (xublitCli) {

        super(xublitCli);

    }

    run () {

        this.xublitCli.assertXublitAppInPwd();
        
        try {
            this.xublitCli.app.performPreflightChecks();
        }
        catch (error) {

            this.debug(error);
            
            let errorType = error.constructor.name;

            this.reportFailure(
                `Preflight failed - ${errorType}: ${error.message}`
            );
            
            process.exit(1);
            
        }

        this.reportSuccess('Preflight looks good');

    }

}

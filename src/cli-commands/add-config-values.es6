import CliCommand from './abstract';

export default class AddConfigValuesCommand extends CliCommand {

    constructor (xublitCli) {

        super(xublitCli);

    }

    run () {

        this.xublitCli.assertXublitAppInPwd();

        var valuesToAdd = this.cmdArgs;
        var key = valuesToAdd.splice(0, 1);

        var app = this.xublitCli.app;
        var xublitConfigFile = app.rootDirectory.xublitConfigFile;

        var config = xublitConfigFile.parseContents(JSON.parse);
        if (!(key in config)) {
            config[key] = [];
        }

        config[key].push(...valuesToAdd);

        xublitConfigFile.contents = JSON.stringify(config, undefined, '  ');

    }

}

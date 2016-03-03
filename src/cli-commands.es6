import CommandRegistry from './cmd-registry';

import InitCommand from './cli-commands/init-app';
import LsprocCommand from './cli-commands/lsproc';
import StartAppCommand from './cli-commands/start-app';
import InstallCommand from './cli-commands/install-module';
import DescribeAppCommand from './cli-commands/describe-app';
import AppPreflightCommand from './cli-commands/app-preflight';
import AddConfigValuesCommand from './cli-commands/add-config-values';

const commandRegistry = new CommandRegistry();

commandRegistry

    .register(
        'init',
        'Initialise a new app in the current dir',
        InitCommand
    )

    .register(
        'install <module>',
        'Install a Xublit module for the current app',
        InstallCommand
    )

    .register(
        'start',
        'Start the app in the current dir',
        StartAppCommand
    )

    .register(
        'preflight',
        'Run pre-flight checks on the current app',
        AppPreflightCommand
    )

    .register(
        'info',
        'Display information about the app in the current dir',
        DescribeAppCommand
    )

    .register(
        'add <key> <values>',
        'Add values for key in current app config',
        AddConfigValuesCommand
    )

    .register(
        'lsproc',
        'List running processes',
        LsprocCommand
    )

;

export function list () {
    return commandRegistry.listAll();
}

export function run (cmd, xublitCli) {
    commandRegistry.run(cmd, xublitCli);
}

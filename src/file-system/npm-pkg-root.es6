import 'babel-polyfill';

import * as path from 'path';
import * as shell from 'shelljs';
import * as __ from '../constants';

import Directory from './directory';

export default class NpmPackageRoot extends Directory {

    constructor (absolutePath) {

        super(absolutePath);

        initProps(this);

    }

    validateNpmPackageConfig () {

        if (!this.containsNpmPackageConfigFile) {
            throw new Error(
                `No ${__.NPM_PACKAGE_CONFIG_FILENAME} found in ${this.absPath}`
            );
        }

    }

}

function initProps (npmPackageRoot) {

    if (!npmPackageRoot.containsFile(__.NPM_PACKAGE_CONFIG_FILENAME)) {
        throw new Error(
            __.INVALID_NPM_PACKAGE_ROOT
        );
    }

    var npmConfigFile = npmPackageRoot.file(__.NPM_PACKAGE_CONFIG_FILENAME);

    Object.defineProperties(npmPackageRoot, {

        npmConfigFile: {
            get: function () {
                return npmConfigFile;
            },
        },

    });

}

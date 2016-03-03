import 'babel-polyfill';

import * as path from 'path';
import * as shell from 'shelljs';
import * as __ from '../constants';

import NpmPackageRoot from './npm-pkg-root';

export default class ApplicationRoot extends NpmPackageRoot {

    constructor (absolutePath) {

        super(absolutePath);

        initProps(this);

    }

}

function initProps (applicationRoot) {

    if (!applicationRoot.containsFile(__.XUBLIT_CONFIG_FILENAME)) {
        throw new Error(
            __.INVALID_XUBLIT_APPLICATION_ROOT
        );
    }

    var xublitConfigFile = applicationRoot.file(__.XUBLIT_CONFIG_FILENAME);

    Object.defineProperties(applicationRoot, {

        xublitConfigFile: {
            get: function () {
                return xublitConfigFile;
            },
        },

    });

}

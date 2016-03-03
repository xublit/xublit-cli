import 'babel-polyfill';

import * as path from 'path';
import * as shell from 'shelljs';
import * as __ from '../../constants';

import Directory from '../directory';

export default class CliAppDataRoot extends Directory {

    constructor (absolutePath) {

        super(absolutePath);

        initProps(this);

    }

}

function initProps (cliAppDataRoot) {

    var procSubdir = new Directory(cliAppDataRoot.absolutePath('proc'));
    var cacheSubdir = new Directory(cliAppDataRoot.absolutePath('cache'));

    Object.defineProperties(cliAppDataRoot, {

        procSubdir: {
            value: procSubdir,
        },

        cacheSubdir: {
            value: cacheSubdir,
        },

    });

}

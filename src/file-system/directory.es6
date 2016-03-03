import File from './file';

import * as path from 'path';
import * as sh from 'shelljs';

export default class Directory {

    constructor (absPath) {

        absPath = path.resolve(absPath);

        initDirIfNotExists(absPath);

        initProps(this, absPath);

        this.parseContents();

    }

    absolutePath () {
        return path.join(this.absPath, ...arguments);
    }

    assertDoesNotContain (handle) {

        if (!this.contains(handle)) {
            return;
        }

        throw new Error(util.format(
            '"%s" already exists', handle
        ));

    }

    parseContents () {

        var dirContents = ls(this.absPath);

        dirContents.forEach((item) => {

            var itemBasename = path.basename(item.name);

            if (item.isFile()) {
                return this.files.push(itemBasename);
            }

            if (item.isDirectory()) {
                return this.subdirs.push(itemBasename);
            }

        });

    }

    clearParsedContents () {
        this.files.splice(0, this.files.length);
        this.subdirs.splice(0, this.subdirs.length);
        return this;
    }

    contains (handle) {
        return this.containsFile(handle) ||
            this.containsDir(handle);
    }

    containsDir (handle) {
        return this.subdirs.indexOf(handle) > -1;
    }

    containsFile (handle) {
        return this.files.indexOf(handle) > -1;
    }

    file (handle) {
        
        if (!this.containsFile(handle)) {
            return undefined;
        }

        if (handle in this.cachedFiles) {
            return this.cachedFiles[handle];
        }

        return this.cachedFiles[handle] = new File(
            this.prefixPath(handle)
        );

    }

    mkfile (handle) {

        this.assertDoesNotContain(handle);

        sh.touch(this.prefixPath(handle));

        this.files.push(handle);

        return this.file(handle);

    }

    mksubdir (handle) {

        this.assertDoesNotContain(handle);

        sh.mkdir(this.prefixPath(handle));

        this.subdirs.push(handle);

        return this.subdir(handle);

    }

    prefixPath (handle) {
        return path.join(this.absPath, handle);
    }

    recursiveLs (subdir) {
        return sh.ls('-R', this.absolutePath(subdir)).map((relativePath) => {
            return path.join(subdir, relativePath);
        });
    }

    refresh () {

        this.clearParsedContents()
            .parseContents();

        return this;

    }

    subdir (handle) {
        
        if (!this.containsDir(handle)) {
            return undefined;
        }

        if (handle in this.cachedSubdirs) {
            return this.cachedSubdirs[handle];
        }

        return this.cachedSubdirs[handle] = new Directory(
            this.prefixPath(handle)
        );

    }

    toString () {
        return this.absPath;
    }

}

function initDirIfNotExists (absPath) {

    if (sh.test('-d', absPath)) {
        return;
    }

    try {
        sh.mkdir(absPath);
    }
    catch (err) {
        throw new Error(util.format(
            'Failed to initialise directory %s: %s', absPath, err.message
        ));
    }

}

function initProps (directory, absPath) {

    var cachedFiles = {};
    var cachedSubdirs = {};

    var basename = path.basename(absPath);

    var filenames = [];
    var subdirnames = [];

    Object.defineProperties(directory, {

        basename: {
            value: basename,
            enumerable: true,
        },

        absPath: {
            value: absPath,
            enumerable: true,
        },

        cachedFiles: {
            value: cachedFiles,
        },

        cachedSubdirs: {
            value: cachedSubdirs,
        },

        dirname: {
            value: path.parse(absPath).base,
        },

        filenames: {
            enumerable: true,
            value: filenames,
        },

        /* depreciated */ files: {
            enumerable: true,
            value: filenames,
        },

        subdirnames: {
            enumerable: true,
            value: subdirnames,
        },

        /* depreciated */ subdirs: {
            enumerable: true,
            value: subdirnames,
        },

    });

}

function ls (dirname) {
    return sh.ls('-Al', dirname);
}

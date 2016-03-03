import * as path from 'path';
import * as fs from 'fs';

export default class File {

    constructor (absPath) {

        initProps(this, path.resolve(absPath));

    }

    append (str) {
        sh.echo(str).toEnd(this.absPath);
        return this;
    }

    parseContents (parser) {
        return parser(this.contents);
    }

}

function initProps (file, absPath) {

    var fd = fs.openSync(absPath, 'r+');

    Object.defineProperties(file, {

        absPath: {
            value: absPath,
        },

        contents: {
            get: function () {
                return fs.readFileSync(fd, { encoding: 'utf8' });
            },
            set: function (newValue) {
                fs.writeFileSync(fd, newValue, { encoding: 'utf8' });
                return newValue;
            },
        },

        filename: {
            value: path.parse(absPath).base,
        },

    });

}

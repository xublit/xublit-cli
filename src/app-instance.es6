import Injector from 'xublit-injector';
import * as path from 'path';

const injector = new Injector({
    baseDir: process.env.pwd,
    includeDirs: [
        path.join(process.env.pwd, 'src'),
    ],
});

injector.bootstrap();

#! /usr/bin/env node
/**
 * Commandline interface
 * Created by xiamx on 2016-08-10.
 */

import * as yargs from 'yargs'
import * as bluebird from 'bluebird'
const fsAsync: any = bluebird.promisifyAll(require('fs'));
import { typescriptOfSchema, Database, extractCommand, getTime } from '../src/index'

let argv: any = yargs
    .usage('Usage: $0 <command> [options]')
    .command('generate', 'generate type definition')
    .demand(1)
    .example('$0 generate -c postgres://username:password@localhost/db -t table1 -t table2 -s schema -n namespace -o interface_output.ts', 'generate typescript interfaces from schema')
    .demand('c')
    .alias('c', 'conn')
    .nargs('c', 1)
    .describe('c', 'database connection string')
    .alias('t', 'table')
    .nargs('t', 1)
    .describe('t', 'table name')
    .alias('s', 'schema')
    .nargs('s', 1)
    .describe('s', 'schema name')
    .demand('n')
    .alias('n', 'namespace')
    .nargs('n', 1)
    .describe('n', 'namespace for interfaces')
    .demand('o')
    .nargs('o', 1)
    .alias('o', 'output')
    .describe('o', 'output file name')
    .help('h')
    .alias('h', 'help')
    .argv;

(async () => {

    try {
        let db = new Database(argv.c);

        if (!Array.isArray(argv.t)) {
            argv.t = [argv.t]
        } else if (!argv.t) {
            argv.t = []
        }

        let formattedOutput = await typescriptOfSchema(
            db, argv.n, argv.t, argv.s,
            extractCommand(process.argv, argv.c), getTime()
        );
        await fsAsync.writeFileAsync(argv.o, formattedOutput.dest)

    } catch (e) {
        console.error(e);
        process.exit(1)
    }

})().then(() => {
    process.exit();
});

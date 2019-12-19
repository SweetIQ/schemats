#! /usr/bin/env node
/**
 * Commandline interface
 * Created by xiamx on 2016-08-10.
 */

import * as yargs from 'yargs';
import * as fs from 'fs';
import { typescriptOfSchema } from '../src/index';

interface SchematsConfig {
  conn: string;
  table: string[] | undefined;
  schema: string | undefined;
  output: string;
  camelCase: boolean;
  noHeader: boolean;
}

const argv: SchematsConfig = yargs
  .usage('Usage: $0 <command> [options]')
  .global('config')
  .default('config', 'schemats.json')
  .config()
  .env('SCHEMATS')
  .command('generate', 'generate type definition')
  .demand(1)
  .example(
    '$0 generate -c postgres://username:password@localhost/db -t table1 -t table2 -s schema -o interface_output.ts',
    'generate typescript interfaces from schema',
  )
  .options({
    conn: {
      demandOption: true,
      type: 'string',
      alias: 'c',
      nargs: 1,
      describe: 'database connection string',
    },
    table: { type: 'array', string: true, alias: 't', describe: 'table name' },
    schema: { type: 'string', alias: 's', nargs: 1, describe: 'schema name' },
    camelCase: {
      type: 'boolean',
      alias: 'C',
      default: false,
      nargs: 1,
      describe: 'Camel-case columns',
    },
    noHeader: { type: 'boolean', default: false, nargs: 1, describe: 'Do not write header' },
    output: {
      demandOption: true,
      type: 'string',
      nargs: 1,
      alias: 'o',
      describe: 'output file name',
    },
  })
  .help('h')
  .alias('h', 'help').argv;

(async (): Promise<void> => {
  try {
    if (!Array.isArray(argv.table)) {
      if (!argv.table) {
        argv.table = [];
      } else {
        argv.table = [argv.table];
      }
    }

    const formattedOutput = await typescriptOfSchema(argv.conn, argv.table, argv.schema, {
      camelCase: argv.camelCase,
      writeHeader: !argv.noHeader,
    });
    fs.writeFileSync(argv.output, formattedOutput);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})()
  .then(() => {
    process.exit();
  })
  .catch((e: any) => {
    console.warn(e);
    process.exit(1);
  });

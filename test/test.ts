/**
 *
 * Created by xiamx on 2016-08-31.
 */

import { loadSchema } from './load_schema'
import * as fs from 'mz/fs'
import { typescriptOfSchema, Database, extractCommand } from '../src/index'
import * as diff from 'diff'

async function compare(outputFile: string, formattedOutput: { dest: string }) {
    await fs.writeFile(outputFile, formattedOutput.dest)

    let gold = await fs.readFile('./test/example/osm.ts', {encoding: 'utf8'});
    let actual = await fs.readFile(outputFile, {encoding: 'utf8'});

    let diffs = diff.diffLines(gold, actual)

    const addOrRemovedLines = diffs.filter(d => d.added || d.removed);

    if (addOrRemovedLines.length > 0) {
        console.error('Generated type definition different from the standard');
        addOrRemovedLines.forEach((d, i) => {
            const t = d.added ? '+' : d.removed ? '-' : 'x';
            console.error(`  [${i}] ${t} ${d.value}`);
        })
        process.exit(1)
    } else {
        console.log('Generated type definition identical to the standard')
        process.exit(0)
    }
}

async function testGeneratingTables(db: Database) {
    await loadSchema('test/osm_schema.sql')
    console.log('loaded osm schema')

    let outputFile = (process.env.CIRCLE_ARTIFACTS || './test') + '/osm.ts'
    let formattedOutput = await typescriptOfSchema(
        db,
        'osm',
        ['users'],
        null,
        extractCommand(
            ['node', 'schemats', 'generate', '-c', 'postgres://secretUser:secretPassword@localhost/test', '-t', 'users', '-o', './test/osm.ts'],
            'postgres://secretUser:secretPassword@localhost/test'
        ),
        '2016-12-07 13:17:46'
    )

    compare(outputFile, formattedOutput)
}

async function testGeneratingSchema(db: Database) {
    await loadSchema('test/maxi_schema.sql')
    console.log('loaded maxi schema')

    let outputFile = (process.env.CIRCLE_ARTIFACTS || './test') + '/maxi.ts'
    let formattedOutput = await typescriptOfSchema(
        db,
        'maxi',
        [],
        'maxi',
        extractCommand(
            ['node', 'schemats', 'generate', '-c', 'postgres://secretUser:secretPassword@localhost/test', '-s', 'maxi', '-o', './test/maxi.ts'],
            'postgres://secretUser:secretPassword@localhost/test'
        ),
        '2016-12-07 13:17:46'
    )
    await fs.writeFile(outputFile, formattedOutput.dest)

    compare(outputFile, formattedOutput)
}

(async () => {
    try {
        let db = new Database(process.env.DATABASE_URL)
        await testGeneratingTables(db)
        await testGeneratingSchema(db)
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
})()

/// <reference path="../node_modules/@types/mocha/index.d.ts" />
import * as assert from 'power-assert'
import * as fs from 'mz/fs'
import * as PgPromise from 'pg-promise'
import { typescriptOfSchema, Database, getDatabase, extractCommand } from '../src/index'
import * as ts from 'typescript';

const diff = require('diff')
interface IDiffResult {
    value: string
    count?: number
    added?: boolean
    removed?: boolean
}

const pgp = PgPromise()

function compile(fileNames: string[], options: ts.CompilerOptions): boolean {
    let program = ts.createProgram(fileNames, options)
    let emitResult = program.emit()
    let exitCode = emitResult.emitSkipped ? 1 : 0
    return exitCode === 0
}

export async function loadSchema(db: Database, file: string) {
    let query = await fs.readFile(file, {
        encoding: 'utf8'
    })
    return await db.query(query)
}

async function compare(goldStandardFile: string, outputFile: string): Promise<boolean> {

    let gold = await fs.readFile(goldStandardFile, {encoding: 'utf8'})
    let actual = await fs.readFile(outputFile, {encoding: 'utf8'})

    let diffs = diff.diffLines(gold, actual, {ignoreWhitespace: true, newlineIsToken: true})

    const addOrRemovedLines = diffs.filter((d: IDiffResult) => d.added || d.removed)

    if (addOrRemovedLines.length > 0) {
        console.error(`Generated type definition different to the standard ${goldStandardFile}`)
        addOrRemovedLines.forEach((d: IDiffResult, i: number) => {
            const t = d.added ? '+' : d.removed ? '-' : 'x'
            console.error(`  [${i}] ${t} ${d.value}`)
        })
        return false
    } else {
        return true
    }
}

describe('postgres schemats interface generation test', () => {
    let db = getDatabase(process.env.DATABASE_URL)
    const testStems = ['osm', 'maxi']
    testStems.forEach((endToEndTestStem: string) => {
    it(`End-to-end test ${endToEndTestStem}`, async () => {
        await loadSchema(db, `test/fixture/${endToEndTestStem}.sql`)
        const outputFile = `${(process.env.CIRCLE_ARTIFACTS || './test/artifacts')}/${endToEndTestStem}.ts`
        const expectedFile = `./test/expected/${endToEndTestStem}.ts`;
        const config: any = require(`./fixture/${endToEndTestStem}.json`)

        const fixtureDate = '2016-12-07 13:17:46'
        const fixturePgConnUri = 'postgres://secretUser:secretPassword@localhost/test'
        let fixtureCommands = ['node', 'schemats', 'generate', '-c', 
                fixturePgConnUri, 
                '-o', `./test/${endToEndTestStem}.ts`]
        if (config.tables.length > 0) {
            config.tables.forEach((t: string) => {
                fixtureCommands.push('-t', t)
            })
        }
        if (config.schema) {
            fixtureCommands.push('-s', config.schema)
        }
        let formattedOutput = await typescriptOfSchema(
            db,
            config.namespace,
            config.tables,
            config.schema,
            extractCommand(fixtureCommands, fixturePgConnUri),
            fixtureDate
            )
        await fs.writeFile(outputFile, formattedOutput)
        return assert(await compare(expectedFile, outputFile))
    })
        
    })
})

describe('mysql schemats interface generation test', () => {
    let db = getDatabase(process.env.MYSQL_URL)
    const testStems = ['osmMysql']
    testStems.forEach((endToEndTestStem: string) => {
    it(`End-to-end test ${endToEndTestStem}`, async () => {
        await loadSchema(db, `test/fixture/${endToEndTestStem}.sql`)
        const outputFile = `${(process.env.CIRCLE_ARTIFACTS || './test/artifacts')}/${endToEndTestStem}.ts`
        const expectedFile = `./test/expected/${endToEndTestStem}.ts`;
        const config: any = require(`./fixture/${endToEndTestStem}.json`)

        const fixtureDate = '2016-12-07 13:17:46'
        const fixturePgConnUri = 'mysql://secretUser:secretPassword@localhost/test'
        let fixtureCommands = ['node', 'schemats', 'generate', '-c',
                fixturePgConnUri,
                '-o', `./test/${endToEndTestStem}.ts`]
        if (config.tables.length > 0) {
            config.tables.forEach((t: string) => {
                fixtureCommands.push('-t', t)
            })
        }
        if (config.schema) {
            fixtureCommands.push('-s', config.schema)
        }
        let formattedOutput = await typescriptOfSchema(
            db,
            config.namespace,
            config.tables,
            config.schema,
            extractCommand(fixtureCommands, fixturePgConnUri),
            fixtureDate
            )
        await fs.writeFile(outputFile, formattedOutput)
        return assert(await compare(expectedFile, outputFile))
    })

    })
})

describe('end user use case', () => {
    it('usecase.ts should compile without error', () => {
        compile(['fixture/usecase.ts'], {
            noEmitOnError: true,
            noImplicitAny: true,
            target: ts.ScriptTarget.ES5,
            module: ts.ModuleKind.CommonJS
        })
    });
})

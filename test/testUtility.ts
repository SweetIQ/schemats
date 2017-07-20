import * as fs from 'mz/fs'
import { typescriptOfSchema, Database, extractCommand } from '../src/index'
import Options from '../src/options'
import * as ts from 'typescript';

const diff = require('diff')
interface IDiffResult {
    value: string
    count?: number
    added?: boolean
    removed?: boolean
}

export function compile(fileNames: string[], options: ts.CompilerOptions): boolean {
    let program = ts.createProgram(fileNames, options)
    let emitResult = program.emit()
    let exitCode = emitResult.emitSkipped ? 1 : 0
    return exitCode === 0
}
export async function compare(goldStandardFile: string, outputFile: string): Promise<boolean> {

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


export async function loadSchema(db: Database, file: string) {
    let query = await fs.readFile(file, {
        encoding: 'utf8'
    })
    return await db.query(query)
}

export async function writeTsFile(inputSQLFile: string, inputConfigFile: string,  outputFile: string, db: Database, options: Options = {}) {
    await loadSchema(db, inputSQLFile)
    const config: any = require(inputConfigFile)

    const fixtureDate = '2016-12-07 13:17:46'
    const fixturePgConnUri = 'sql://secretUser:secretPassword@localhost/test'
    let fixtureCommands = ['node', 'schemats', 'generate', '-c',
        fixturePgConnUri,
        '-o', outputFile]
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
        options,
        extractCommand(fixtureCommands),
        fixtureDate
    )
    await fs.writeFile(outputFile, formattedOutput)
}

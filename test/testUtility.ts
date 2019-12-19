import * as fs from 'mz/fs';
import { Database, typescriptOfSchema } from '../src/index';
import * as ts from 'typescript';
import { diffLines } from 'diff';

interface DiffResult {
  value: string;
  count?: number;
  added?: boolean;
  removed?: boolean;
}

export function compile(fileNames: string[], options: ts.CompilerOptions): boolean {
  const program = ts.createProgram(fileNames, options);
  const emitResult = program.emit();
  const exitCode = emitResult.emitSkipped ? 1 : 0;
  return exitCode === 0;
}

export async function compare(goldStandardFile: string, outputFile: string): Promise<boolean> {
  const gold = await fs.readFile(goldStandardFile, { encoding: 'utf8' });
  const actual = await fs.readFile(outputFile, { encoding: 'utf8' });

  const diffs = diffLines(gold, actual, { ignoreWhitespace: true, newlineIsToken: true });

  const addOrRemovedLines = diffs.filter((d: DiffResult) => d.added || d.removed);

  if (addOrRemovedLines.length > 0) {
    console.error(`Generated type definition different to the standard ${goldStandardFile}`);
    addOrRemovedLines.forEach((d: DiffResult, i: number) => {
      const t = d.added ? '+' : d.removed ? '-' : 'x';
      console.error(`  [${i}] ${t} ${d.value}`);
    });
    return false;
  } else {
    return true;
  }
}

export async function loadSchema(db: Database, file: string): Promise<Record<string, any>[]> {
  const query = await fs.readFile(file, {
    encoding: 'utf8',
  });
  return await db.query(query);
}

export async function writeTsFile(
  inputSQLFile: string,
  inputConfigFile: string,
  outputFile: string,
  db: Database,
): Promise<void> {
  await loadSchema(db, inputSQLFile);
  /* eslint-disable @typescript-eslint/no-var-requires */
  const config: any = require(inputConfigFile);
  /* eslint-enable @typescript-eslint/no-var-requires */
  const formattedOutput = await typescriptOfSchema(db, config.tables, config.schema, {
    camelCase: config.camelCase,
    writeHeader: config.writeHeader,
  });
  await fs.writeFile(outputFile, formattedOutput);
}

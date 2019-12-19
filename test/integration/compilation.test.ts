import * as ts from 'typescript';
import { compile } from '../testUtility';

describe('end user use case', () => {
  it('usecase.ts should compile without error', () => {
    compile(['fixture/usecase.ts'], {
      noEmitOnError: true,
      noImplicitAny: true,
      target: ts.ScriptTarget.ES5,
      module: ts.ModuleKind.CommonJS,
    });
  });
});

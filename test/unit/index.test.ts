import * as assert from 'assert';
import * as sinon from 'sinon';
import * as Index from '../../src/index';
import * as Typescript from '../../src/typescript';
import { Database } from '../../src';
import Options, { OptionValues } from '../../src/options';
import { SinonStub } from 'sinon';

const options: OptionValues = {};

function stub(fn: Function): SinonStub {
  return fn as SinonStub;
}

describe('index', () => {
  const typedTableSandbox = sinon.createSandbox();
  const db = {
    getDefaultSchema: typedTableSandbox.stub(),
    getTableTypes: typedTableSandbox.stub(),
    query: typedTableSandbox.stub(),
    getEnumTypes: typedTableSandbox.stub(),
    getTableDefinition: typedTableSandbox.stub(),
    getSchemaTables: typedTableSandbox.stub(),
    connectionString: 'sql://',
  } as Database;
  const tsReflection = Typescript;
  const dbReflection = db;
  before(() => {
    typedTableSandbox.stub(Typescript, 'generateEnumType');
    typedTableSandbox.stub(Typescript, 'generateTableTypes');
    typedTableSandbox.stub(Typescript, 'generateTableInterface');
  });
  beforeEach(() => {
    typedTableSandbox.reset();
  });
  after(() => {
    typedTableSandbox.restore();
  });
  describe('typescriptOfTable', () => {
    it('merges string results', async () => {
      stub(dbReflection.getTableTypes).returns(Promise.resolve('tableTypes'));
      stub(tsReflection.generateTableTypes).returns('generatedTableTypes\n');
      stub(tsReflection.generateTableInterface).returns('generatedTableInterfaces\n');
      const typescriptString = await Index.typescriptOfTable(db, 'tableName', 'schemaName', new Options(options));
      assert.equal(typescriptString, 'generatedTableTypes\ngeneratedTableInterfaces\n');
    });
  });
  describe('typescriptOfSchema', () => {
    it('has schema', async () => {
      stub(dbReflection.getSchemaTables).returns(Promise.resolve(['tablename']));
      stub(dbReflection.getEnumTypes).returns(Promise.resolve('enumTypes'));
      stub(tsReflection.generateTableTypes).returns('generatedTableTypes\n');
      stub(tsReflection.generateEnumType).returns('generatedEnumTypes\n');
      await Index.typescriptOfSchema(db, [], 'schemaName', options);

      assert.deepEqual(stub(dbReflection.getSchemaTables).getCall(0).args[0], 'schemaName');
      assert.deepEqual(stub(dbReflection.getEnumTypes).getCall(0).args[0], 'schemaName');
      assert.deepEqual(stub(tsReflection.generateEnumType).getCall(0).args[0], 'enumTypes');
      assert.deepEqual(stub(tsReflection.generateTableTypes).getCall(0).args[0], 'tablename');
    });
    it('has tables provided', async () => {
      stub(dbReflection.getSchemaTables).returns(Promise.resolve(['tablename']));
      stub(dbReflection.getEnumTypes).returns(Promise.resolve('enumTypes'));
      stub(tsReflection.generateTableTypes).returns('generatedTableTypes\n');
      stub(tsReflection.generateEnumType).returns('generatedEnumTypes\n');
      await Index.typescriptOfSchema(db, ['differentTablename'], null, options);
      assert(!stub(dbReflection.getSchemaTables).called);
      assert.deepEqual(stub(tsReflection.generateEnumType).getCall(0).args[0], 'enumTypes');
      assert.deepEqual(stub(tsReflection.generateTableTypes).getCall(0).args[0], 'differentTablename');
    });
  });
});

import * as assert from 'assert'
import * as Typescript from '../../src/typescript'
import Options from '../../src/options'

const options = new Options({})

describe('Typescript', () => {
    describe('generateTableInterface', () => {
        it('empty table definition object', () => {
            const tableInterface = Typescript.generateTableInterface('tableName', {}, options)
            assert.equal(tableInterface,
                '\n' +
                '        export interface tableName {\n' +
                '        \n' +
                '        }\n' +
                '    ')
        })
        it('table name is reserved', () => {
            const tableInterface = Typescript.generateTableInterface('package', {}, options)
            assert.equal(tableInterface,
                '\n' +
                '        export interface package_ {\n' +
                '        \n' +
                '        }\n' +
                '    ')
        })
        it('table with columns', () => {
            const tableInterface = Typescript.generateTableInterface('tableName', {
                col1: {udtName: 'name1', nullable: false, defaultValue: null},
                col2: {udtName: 'name2', nullable: false, defaultValue: null}
            }, options)
            assert.equal(tableInterface,
                '\n' +
                '        export interface tableName {\n' +
                '        col1: tableNameFields.col1;\n' +
                'col2: tableNameFields.col2;\n' +
                '\n' +
                '        }\n' +
                '    ')
        })
        it('table with reserved columns', () => {
            const tableInterface = Typescript.generateTableInterface('tableName', {
                string: {udtName: 'name1', nullable: false, defaultValue: null},
                number: {udtName: 'name2', nullable: false, defaultValue: null},
                package: {udtName: 'name3', nullable: false, defaultValue: null}
            }, options)
            assert.equal(tableInterface,
                '\n' +
                '        export interface tableName {\n' +
                '        number: tableNameFields.number_;\n' +
                'package: tableNameFields.package_;\n' +
                'string: tableNameFields.string_;\n' +
                '\n' +
                '        }\n' +
                '    ')
        })
    })
    describe('generateEnumType', () => {
        it('empty object', () => {
            const enumType = Typescript.generateEnumType({}, options)
            assert.equal(enumType,'')
        })
        it('with enumerations', () => {
            const enumType = Typescript.generateEnumType({
                enum1: ['val1','val2','val3','val4'],
                enum2: ['val5','val6','val7','val8']
            }, options)
            assert.equal(enumType,
                'export type enum1 = \'val1\' | \'val2\' | \'val3\' | \'val4\';\n' +
                'export type enum2 = \'val5\' | \'val6\' | \'val7\' | \'val8\';\n')
        })
    })
    describe('generateEnumType', () => {
        it('empty object', () => {
            const enumType = Typescript.generateEnumType({}, options)
            assert.equal(enumType,'')
        })
        it('with enumerations', () => {
            const enumType = Typescript.generateEnumType({
                enum1: ['val1','val2','val3','val4'],
                enum2: ['val5','val6','val7','val8']
            }, options)
            assert.equal(enumType,
                'export type enum1 = \'val1\' | \'val2\' | \'val3\' | \'val4\';\n' +
                'export type enum2 = \'val5\' | \'val6\' | \'val7\' | \'val8\';\n')
        })
    })
    describe('generateTableTypes', () => {
        it('empty table definition object', () => {
            const tableTypes = Typescript.generateTableTypes('tableName',{}, options)
            assert.equal(tableTypes,
                '\n' +
                '        export namespace tableNameFields {' +
                '\n        ' +
                '\n        ' +
                '}' +
                '\n    ')
        })
        it('with table definitions', () => {
            const tableTypes = Typescript.generateTableTypes('tableName', {
                col1: {udtName: 'name1', nullable: false, tsType: 'string', defaultValue: ''},
                col2: {udtName: 'name2', nullable: false, tsType: 'number', defaultValue: '0'}
            }, options)
            assert.equal(tableTypes,
                '\n' +
                '        export namespace tableNameFields {' +
                '\n        export type col1 = string;' +
                '\nexport type col2 = number;' +
                '\n' +
                '\n        }' +
                '\n    ')
        })
        it('with nullable column definitions', () => {
            const tableTypes = Typescript.generateTableTypes('tableName', {
                col1: {udtName: 'name1', nullable: true, tsType: 'string', defaultValue: ''},
                col2: {udtName: 'name2', nullable: true, tsType: 'number', defaultValue: '0'}
            }, options)
            assert.equal(tableTypes,
                '\n' +
                '        export namespace tableNameFields {' +
                '\n        export type col1 = string| null;' +
                '\nexport type col2 = number| null;' +
                '\n' +
                '\n        }' +
                '\n    ')
        })
    })
})

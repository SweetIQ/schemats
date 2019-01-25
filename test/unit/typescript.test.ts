import * as assert from 'assert'
import * as Typescript from '../../src/typescript'
import Options from '../../src/options'
import { assertEqualCode } from '../testUtility'

const options = new Options()

describe('Typescript', () => {
    describe('generateTableInterface', () => {
        it('empty table definition object', () => {
            const tableInterface = Typescript.generateTableInterface('tableName', {}, options)
            assertEqualCode(tableInterface, `export interface tableName { }`)
        })
        it('table name is reserved', () => {
            const tableInterface = Typescript.generateTableInterface('package', {}, options)
            assertEqualCode(tableInterface, `export interface package_ { }`)
        })
        it('table with columns', () => {
            const tableInterface = Typescript.generateTableInterface('tableName', {
                col1: {udtName: 'name1', nullable: false},
                col2: {udtName: 'name2', nullable: false}
            }, options)
            assertEqualCode(tableInterface, `
                export interface tableName {
                    col1: tableNameFields.col1;
                    col2: tableNameFields.col2;
                }
            `)
        })
        it('table with reserved columns', () => {
            const tableInterface = Typescript.generateTableInterface('tableName', {
                string: {udtName: 'name1', nullable: false},
                number: {udtName: 'name2', nullable: false},
                package: {udtName: 'name3', nullable: false}
            }, options)
            assertEqualCode(tableInterface, `
                export interface tableName {
                    string: tableNameFields.string_;
                    number: tableNameFields.number_;
                    package: tableNameFields.package_;
                }
            `)
        })
    })
    describe('generateEnumType', () => {
        it('empty object', () => {
            const enumType = Typescript.generateEnumType({}, options)
            assertEqualCode(enumType, `export namespace customTypes { }`)
        })
        it('with enumerations', () => {
            const type = {
                enum2: ['val5','val6','val7','val8'],
                enum1: ['val3','val4','val1','val2']
            }
            assertEqualCode(Typescript.generateEnumType(type, options), `
                export namespace customTypes {
                    export type enum2 = 'val5' | 'val6' | 'val7' | 'val8';
                    export type enum1 = 'val3' | 'val4' | 'val1' | 'val2';
                }
            `)

            assertEqualCode(Typescript.generateEnumType(type, new Options({ order: true })), `
                export namespace customTypes {
                    export type enum1 = 'val1' | 'val2' | 'val3' | 'val4';
                    export type enum2 = 'val5' | 'val6' | 'val7' | 'val8';
                }
            `)
        })
    })
    describe('generateTableTypes', () => {
        it('empty table definition object', () => {
            const tableTypes = Typescript.generateTableTypes('tableName',{}, options)
            assertEqualCode(tableTypes, `export namespace tableNameFields { }`)
        })
        it('with table definitions', () => {
            const tableTypes = Typescript.generateTableTypes('tableName', {
                col1: {udtName: 'name1', nullable: false, tsType: 'string'},
                col2: {udtName: 'name2', nullable: false, tsType: 'number'}
            }, options)
            assertEqualCode(tableTypes, `export namespace tableNameFields {
                export type col1 = string;
                export type col2 = number;
            }`)
        })
        it('with nullable column definitions', () => {
            const tableTypes = Typescript.generateTableTypes('tableName', {
                col1: {udtName: 'name1', nullable: true, tsType: 'string'},
                col2: {udtName: 'name2', nullable: true, tsType: 'number'}
            }, options)
            assertEqualCode(tableTypes, `export namespace tableNameFields {
                export type col1 = string| null;
                export type col2 = number| null;
            }`)
        })
    })
})

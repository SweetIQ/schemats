/**
 * Generate typescript interface from table schema
 * Created by xiamx on 2016-08-10.
 */

import { TableDefinition } from './schemaInterfaces';
import Options from './options';

function nameIsReservedKeyword(name: string): boolean {
  const reservedKeywords = ['string', 'number', 'package'];
  return reservedKeywords.indexOf(name) !== -1;
}

function normalizeName(name: string): string {
  if (nameIsReservedKeyword(name)) {
    return name + '_';
  } else {
    return name;
  }
}

export function generateTableInterface(
  tableNameRaw: string,
  tableDefinition: TableDefinition,
  options: Options,
): string {
  const tableName = options.transformTypeName(tableNameRaw);
  let members = '';
  Object.keys(tableDefinition)
    .map(c => options.transformColumnName(c))
    .forEach((columnName): void => {
      members += `${columnName}: ${tableName}Fields.${normalizeName(columnName)};\n`;
    });

  return `
        export interface ${normalizeName(tableName)} {
        ${members}
        }
    `;
}

export function generateEnumType(enumObject: any, options: Options): string {
  let enumString = '';
  for (const enumNameRaw in enumObject) {
    const enumName = options.transformTypeName(enumNameRaw);
    enumString += `export type ${enumName} = `;
    enumString += enumObject[enumNameRaw].map((v: string): string => `'${v}'`).join(' | ');
    enumString += ';\n';
  }
  return enumString;
}

export function generateTableTypes(tableNameRaw: string, tableDefinition: TableDefinition, options: Options): string {
  const tableName = options.transformTypeName(tableNameRaw);
  let fields = '';
  Object.keys(tableDefinition).forEach((columnNameRaw): void => {
    const type = tableDefinition[columnNameRaw].tsType;
    const nullable = tableDefinition[columnNameRaw].nullable ? '| null' : '';
    const columnName = options.transformColumnName(columnNameRaw);
    fields += `export type ${normalizeName(columnName)} = ${type}${nullable};\n`;
  });

  return `
        export namespace ${tableName}Fields {
        ${fields}
        }
    `;
}

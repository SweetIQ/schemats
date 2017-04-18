export interface ColumnDefinition {
    udtName: string,
    nullable: boolean,
    tsType?: string
}

export interface TableDefinition {
    [columnName: string]: ColumnDefinition
}

export interface Database {
    getEnumTypes(schema?: string): any
    getTableDefinition(tableName: string, tableSchema: string): Promise<TableDefinition>
    getTableTypes(tableName: string, tableSchema: string): Promise<TableDefinition>
    getSchemaTables(schemaName: string): Promise<string[]>
}

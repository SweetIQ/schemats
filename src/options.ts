import { camelCase, upperFirst } from 'lodash'
import { singular } from 'pluralize';

const DEFAULT_OPTIONS: OptionValues = {
    writeHeader: true,
    camelCase: false,
    singularTableNames: false
}

export type OptionValues = {
    camelCase?: boolean
    writeHeader?: boolean // write schemats description header
    singularTableNames?: boolean
}

export default class Options {
    public options: OptionValues

    constructor (options: OptionValues = {}) {
        this.options = {...DEFAULT_OPTIONS, ...options}
    }

    transformTypeName (typename: string) {
        if (this.options.singularTableNames)
            typename = singular(typename);

        if (this.options.camelCase)
            typename = upperFirst(camelCase(typename));

        return this.options.camelCase ? upperFirst(camelCase(typename)) : typename
    }

    transformColumnName (columnName: string) {
        return this.options.camelCase ? camelCase(columnName) : columnName
    }
}

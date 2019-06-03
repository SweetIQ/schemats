import { camelCase, upperFirst } from 'lodash'

const DEFAULT_OPTIONS: OptionValues = {
    writeHeader: true,
    camelCase: false
}

export type OptionValues = {
    camelCase?: boolean
    camelCaseTypes?: boolean
    camelCaseColumns?: boolean
    writeHeader?: boolean // write schemats description header
}

export default class Options {
    public options: OptionValues

    constructor (options: OptionValues = {}) {
        this.options = {...DEFAULT_OPTIONS, ...options}
    }

    transformTypeName (typename: string) {
        return this.options.camelCaseTypes || this.options.camelCase ? upperFirst(camelCase(typename)) : typename
    }

    transformColumnName (columnName: string) {
        return this.options.camelCaseColumns || this.options.camelCase ? camelCase(columnName) : columnName
    }
}

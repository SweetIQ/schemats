import { camelCase, upperFirst } from 'lodash'

const DEFAULT_OPTIONS: OptionValues = {
    writeHeader: true,
    camelCase: false
}

export type OptionValues = {
    camelCase?: boolean | 'columns' | 'types',
    writeHeader?: boolean // write schemats description header
}

export default class Options {
    public options: OptionValues

    constructor (options: OptionValues = {}) {
        this.options = {...DEFAULT_OPTIONS, ...options}
    }

    transformTypeName (typename: string) {
        return this.options.camelCase === true || this.options.camelCase === 'types' ? upperFirst(camelCase(typename)) : typename
    }

    transformColumnName (columnName: string) {
        return this.options.camelCase === true || this.options.camelCase === 'columns' ? camelCase(columnName) : columnName
    }
}

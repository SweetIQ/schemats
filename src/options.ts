import { camelCase, upperFirst } from 'lodash'

export type OptionValues = {
    camelCase?: boolean
    writeHeader?: boolean // write schemats description header
}

export default class Options {
    constructor (public options: OptionValues = {}) {
    }

    transformTypeName (typename: string) {
        return this.options.camelCase ? upperFirst(camelCase(typename)) : typename
    }
    transformColumnName (columnName: string) {
        return this.options.camelCase ? camelCase(columnName) : columnName
    }
}

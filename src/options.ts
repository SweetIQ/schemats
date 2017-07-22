import { camelCase, upperFirst } from 'lodash'

export type OptionValues = {
    camelCase?: boolean
}

export default class Options {
    private _options: OptionValues
    constructor (options: OptionValues) {
        this._options = options
    }

    transformTypeName (typename: string) {
        return this._options.camelCase ? upperFirst(camelCase(typename)) : typename
    }
    transformColumnName (columnName: string) {
        return this._options.camelCase ? camelCase(columnName) : columnName
    }
}

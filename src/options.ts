import { camelCase, upperFirst, sortBy, keys } from 'lodash'

const DEFAULT_OPTIONS: Required<OptionValues> = {
    camelCase: false,
    order: false,
    writeHeader: true
}

export type OptionValues = {
    camelCase?: boolean
    order?: boolean
    writeHeader?: boolean // write schemats description header
}

export default class Options {
    public options: Required<OptionValues>

    constructor (options?: OptionValues) {
        this.options = {...DEFAULT_OPTIONS, ...options}
    }

    getKeys (obj: any): string[] {
        return this.getMaybeSorted(keys(obj))
    }

    getMaybeSorted (arr: string[]): string[] {
        return this.options.order ? sortBy(arr) : arr
    }

    transformTypeName (typename: string) {
        return this.options.camelCase ? upperFirst(camelCase(typename)) : typename
    }

    transformColumnName (columnName: string) {
        return this.options.camelCase ? camelCase(columnName) : columnName
    }
}

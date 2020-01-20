/* tslint:disable */

export type EnumEnumCol = 'enum1' | 'enum2' | 'enum3'
export type EnumNullableEnumCol = 'enum1' | 'enum2' | 'enum3'
export type SetSetCol = 'set1' | 'set2' | 'set3'
export type SetNullableSetCol = 'set1' | 'set2' | 'set3'

export interface Users {
    bigintCol: number
    binaryCol: Buffer
    bitCol: Buffer
    blobCol: Buffer
    charCol: string
    dateCol: Date
    datetimeCol: Date
    decimalCol: number
    doubleCol: number
    enumCol?: EnumEnumCol
    floatCol: number
    geometryCol: string
    intCol: number
    integerCol: number
    longblobCol: Buffer
    longtextCol: string
    mediumblobCol: Buffer
    mediumintCol: number
    mediumtextCol: string
    nullableBigintCol: number | null
    nullableBinaryCol: Buffer | null
    nullableBitCol: Buffer | null
    nullableBlobCol: Buffer | null
    nullableCharCol: string | null
    nullableDateCol: Date | null
    nullableDatetimeCol: Date | null
    nullableDecimalCol: number | null
    nullableDoubleCol: number | null
    nullableEnumCol: EnumNullableEnumCol | null
    nullableFloatCol: number | null
    nullableGeometryCol: string | null
    nullableIntCol: number | null
    nullableIntegerCol: number | null
    nullableLongblobCol: Buffer | null
    nullableLongtextCol: string | null
    nullableMediumblobCol: Buffer | null
    nullableMediumintCol: number | null
    nullableMediumtextCol: string | null
    nullableNumericCol: number | null
    nullableSetCol: SetNullableSetCol | null
    nullableSmallintCol: number | null
    nullableTextCol: string | null
    nullableTimeCol: string | null
    nullableTinyblobCol: Buffer | null
    nullableTinyintCol: boolean | null
    nullableTinytextCol: string | null
    nullableVarbinaryCol: Buffer | null
    nullableYearCol: number | null
    numericCol: number
    setCol?: SetSetCol
    smallintCol: number
    textCol: string
    timeCol: string
    timestampCol?: Date
    tinyblobCol: Buffer
    tinyintCol: boolean
    tinytextCol: string
    varbinaryCol: Buffer
    yearCol: number
}

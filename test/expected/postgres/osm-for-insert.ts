/* tslint:disable */

export type FormatEnum = 'html' | 'markdown' | 'text'
export type UserStatusEnum =
    | 'active'
    | 'confirmed'
    | 'deleted'
    | 'pending'
    | 'suspended'

export interface Users {
    authProvider: string | null
    authUid: string | null
    boolArrayCol: Array<boolean> | null
    byteaArrayCol: Array<string> | null
    byteaCol: string | null
    changesetsCount?: number
    charCol: string | null
    considerPd?: boolean
    creationIp: string | null
    creationTime: Date
    customTableType: 'a' | 'b' | 'c'
    dataPublic?: boolean
    dateCol: Date | null
    description?: string
    descriptionFormat?: FormatEnum
    diaryEntriesCount?: number
    displayName?: string
    doubleCol: number | null
    email: string
    emailValid?: boolean
    homeLat: number | null
    homeLon: number | null
    homeZoom?: number | null
    id: number
    imageContentType: string | null
    imageFileName: string | null
    imageFingerprint: string | null
    imageUseGravatar?: boolean
    inetCol: string | null
    int2ArrayCol: Array<number> | null
    int4ArrayCol: Array<number> | null
    int8ArrayCol: Array<number> | null
    intervalCol: string | null
    jsonArrayCol: Array<Object> | null
    jsonCol: any | null
    jsonbArrayCol: Array<Object> | null
    jsonbCol: any | null
    languages: string | null
    moneyCol: number | null
    nameTypeCol: string | null
    nearby?: number | null
    newEmail: string | null
    number: number | null
    numericCol: number | null
    oidCol: number | null
    passCrypt: string
    passSalt: string | null
    preferredEditor: string | null
    realCol: number | null
    status?: UserStatusEnum
    string: string | null
    termsAgreed: Date | null
    termsSeen?: boolean
    textArrayCol: Array<string> | null
    timeCol: string | null
    timeWithTz: string | null
    timestamptzArrayCol: Array<Date> | null
    tracesCount?: number
    unspportedPathType: any | null
    uuidArrayCol: Array<string> | null
    uuidColumn: string | null
    varcharArrayCol: Array<string> | null
}

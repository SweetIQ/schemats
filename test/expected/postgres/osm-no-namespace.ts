/* tslint:disable */

export type FormatEnum = 'html' | 'markdown' | 'text'
export type UserStatusEnum =
    | 'active'
    | 'confirmed'
    | 'deleted'
    | 'pending'
    | 'suspended'

export interface Users {
    email: string
    id: number
    passCrypt: string
    creationTime: Date
    displayName: string
    dataPublic: boolean
    description: string
    homeLat: number | null
    homeLon: number | null
    homeZoom: number | null
    nearby: number | null
    passSalt: string | null
    imageFileName: string | null
    emailValid: boolean
    newEmail: string | null
    creationIp: string | null
    languages: string | null
    status: UserStatusEnum
    termsAgreed: Date | null
    considerPd: boolean
    preferredEditor: string | null
    termsSeen: boolean
    authUid: string | null
    descriptionFormat: FormatEnum
    imageFingerprint: string | null
    changesetsCount: number
    tracesCount: number
    diaryEntriesCount: number
    imageUseGravatar: boolean
    imageContentType: string | null
    authProvider: string | null
    uuidColumn: string | null
    number: number | null
    string: string | null
    moneyCol: number | null
    charCol: string | null
    timeCol: string | null
    inetCol: string | null
    jsonbCol: any | null
    numericCol: number | null
    byteaCol: string | null
    boolArrayCol: Array<boolean> | null
    varcharArrayCol: Array<string> | null
    int2ArrayCol: Array<number> | null
    int4ArrayCol: Array<number> | null
    int8ArrayCol: Array<number> | null
    uuidArrayCol: Array<string> | null
    textArrayCol: Array<string> | null
    byteaArrayCol: Array<string> | null
    realCol: number | null
    doubleCol: number | null
    timeWithTz: string | null
    oidCol: number | null
    intervalCol: string | null
    jsonCol: any | null
    dateCol: Date | null
    unspportedPathType: any | null
    nameTypeCol: string | null
    jsonArrayCol: Array<Object> | null
    jsonbArrayCol: Array<Object> | null
    timestamptzArrayCol: Array<Date> | null
}

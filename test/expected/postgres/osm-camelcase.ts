/* tslint:disable */

export type FormatEnum = 'html' | 'markdown' | 'text'
export type UserStatusEnum =
    | 'active'
    | 'confirmed'
    | 'deleted'
    | 'pending'
    | 'suspended'

export namespace UsersFields {
    export type authProvider = string | null
    export type authUid = string | null
    export type boolArrayCol = Array<boolean> | null
    export type byteaArrayCol = Array<string> | null
    export type byteaCol = string | null
    export type changesetsCount = number
    export type charCol = string | null
    export type considerPd = boolean
    export type creationIp = string | null
    export type creationTime = Date
    export type customTableType = 'a' | 'b' | 'c'
    export type dataPublic = boolean
    export type dateCol = Date | null
    export type description = string
    export type descriptionFormat = FormatEnum
    export type diaryEntriesCount = number
    export type displayName = string
    export type doubleCol = number | null
    export type email = string
    export type emailValid = boolean
    export type homeLat = number | null
    export type homeLon = number | null
    export type homeZoom = number | null
    export type id = number
    export type imageContentType = string | null
    export type imageFileName = string | null
    export type imageFingerprint = string | null
    export type imageUseGravatar = boolean
    export type inetCol = string | null
    export type int2ArrayCol = Array<number> | null
    export type int4ArrayCol = Array<number> | null
    export type int8ArrayCol = Array<number> | null
    export type intervalCol = string | null
    export type jsonArrayCol = Array<Object> | null
    export type jsonCol = any | null
    export type jsonbArrayCol = Array<Object> | null
    export type jsonbCol = any | null
    export type languages = string | null
    export type moneyCol = number | null
    export type nameTypeCol = string | null
    export type nearby = number | null
    export type newEmail = string | null
    export type number_ = number | null
    export type numericCol = number | null
    export type oidCol = number | null
    export type passCrypt = string
    export type passSalt = string | null
    export type preferredEditor = string | null
    export type realCol = number | null
    export type status = UserStatusEnum
    export type string_ = string | null
    export type termsAgreed = Date | null
    export type termsSeen = boolean
    export type textArrayCol = Array<string> | null
    export type timeCol = string | null
    export type timeWithTz = string | null
    export type timestamptzArrayCol = Array<Date> | null
    export type tracesCount = number
    export type unspportedPathType = any | null
    export type uuidArrayCol = Array<string> | null
    export type uuidColumn = string | null
    export type varcharArrayCol = Array<string> | null
}

export interface Users {
    authProvider: UsersFields.authProvider
    authUid: UsersFields.authUid
    boolArrayCol: UsersFields.boolArrayCol
    byteaArrayCol: UsersFields.byteaArrayCol
    byteaCol: UsersFields.byteaCol
    changesetsCount: UsersFields.changesetsCount
    charCol: UsersFields.charCol
    considerPd: UsersFields.considerPd
    creationIp: UsersFields.creationIp
    creationTime: UsersFields.creationTime
    customTableType: UsersFields.customTableType
    dataPublic: UsersFields.dataPublic
    dateCol: UsersFields.dateCol
    description: UsersFields.description
    descriptionFormat: UsersFields.descriptionFormat
    diaryEntriesCount: UsersFields.diaryEntriesCount
    displayName: UsersFields.displayName
    doubleCol: UsersFields.doubleCol
    email: UsersFields.email
    emailValid: UsersFields.emailValid
    homeLat: UsersFields.homeLat
    homeLon: UsersFields.homeLon
    homeZoom: UsersFields.homeZoom
    id: UsersFields.id
    imageContentType: UsersFields.imageContentType
    imageFileName: UsersFields.imageFileName
    imageFingerprint: UsersFields.imageFingerprint
    imageUseGravatar: UsersFields.imageUseGravatar
    inetCol: UsersFields.inetCol
    int2ArrayCol: UsersFields.int2ArrayCol
    int4ArrayCol: UsersFields.int4ArrayCol
    int8ArrayCol: UsersFields.int8ArrayCol
    intervalCol: UsersFields.intervalCol
    jsonArrayCol: UsersFields.jsonArrayCol
    jsonCol: UsersFields.jsonCol
    jsonbArrayCol: UsersFields.jsonbArrayCol
    jsonbCol: UsersFields.jsonbCol
    languages: UsersFields.languages
    moneyCol: UsersFields.moneyCol
    nameTypeCol: UsersFields.nameTypeCol
    nearby: UsersFields.nearby
    newEmail: UsersFields.newEmail
    number: UsersFields.number_
    numericCol: UsersFields.numericCol
    oidCol: UsersFields.oidCol
    passCrypt: UsersFields.passCrypt
    passSalt: UsersFields.passSalt
    preferredEditor: UsersFields.preferredEditor
    realCol: UsersFields.realCol
    status: UsersFields.status
    string: UsersFields.string_
    termsAgreed: UsersFields.termsAgreed
    termsSeen: UsersFields.termsSeen
    textArrayCol: UsersFields.textArrayCol
    timeCol: UsersFields.timeCol
    timeWithTz: UsersFields.timeWithTz
    timestamptzArrayCol: UsersFields.timestamptzArrayCol
    tracesCount: UsersFields.tracesCount
    unspportedPathType: UsersFields.unspportedPathType
    uuidArrayCol: UsersFields.uuidArrayCol
    uuidColumn: UsersFields.uuidColumn
    varcharArrayCol: UsersFields.varcharArrayCol
}

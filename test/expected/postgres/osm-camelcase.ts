/* tslint:disable */

type HasTypeKey<T> = {
    [K in keyof T]: {
        type: any
    }
}

type SimpleSchema<T extends HasTypeKey<T>> = {
    [K in keyof T]: T[K]['type']
}

export type FormatEnum = 'html' | 'markdown' | 'text';
export type UserStatusEnum = 'active' | 'confirmed' | 'deleted' | 'pending' | 'suspended';

export namespace UsersFields {
    export type email = { type: string, primaryKey: false, unique: false, };
    export type id = { type: number, primaryKey: false, unique: false, };
    export type passCrypt = { type: string, primaryKey: false, unique: false, };
    export type creationTime = { type: Date, primaryKey: false, unique: false, };
    export type displayName = { type: string, primaryKey: false, unique: false, };
    export type dataPublic = { type: boolean, primaryKey: false, unique: false, };
    export type description = { type: string, primaryKey: false, unique: false, };
    export type homeLat = { type: number | null, primaryKey: false, unique: false, };
    export type homeLon = { type: number | null, primaryKey: false, unique: false, };
    export type homeZoom = { type: number | null, primaryKey: false, unique: false, };
    export type nearby = { type: number | null, primaryKey: false, unique: false, };
    export type passSalt = { type: string | null, primaryKey: false, unique: false, };
    export type imageFileName = { type: string | null, primaryKey: false, unique: false, };
    export type emailValid = { type: boolean, primaryKey: false, unique: false, };
    export type newEmail = { type: string | null, primaryKey: false, unique: false, };
    export type creationIp = { type: string | null, primaryKey: false, unique: false, };
    export type languages = { type: string | null, primaryKey: false, unique: false, };
    export type status = { type: UserStatusEnum, primaryKey: false, unique: false, };
    export type termsAgreed = { type: Date | null, primaryKey: false, unique: false, };
    export type considerPd = { type: boolean, primaryKey: false, unique: false, };
    export type preferredEditor = { type: string | null, primaryKey: false, unique: false, };
    export type termsSeen = { type: boolean, primaryKey: false, unique: false, };
    export type authUid = { type: string | null, primaryKey: false, unique: false, };
    export type descriptionFormat = { type: FormatEnum, primaryKey: false, unique: false, };
    export type imageFingerprint = { type: string | null, primaryKey: false, unique: false, };
    export type changesetsCount = { type: number, primaryKey: false, unique: false, };
    export type tracesCount = { type: number, primaryKey: false, unique: false, };
    export type diaryEntriesCount = { type: number, primaryKey: false, unique: false, };
    export type imageUseGravatar = { type: boolean, primaryKey: false, unique: false, };
    export type imageContentType = { type: string | null, primaryKey: false, unique: false, };
    export type authProvider = { type: string | null, primaryKey: false, unique: false, };
    export type uuidColumn = { type: string | null, primaryKey: false, unique: false, };
    export type number_ = { type: number | null, primaryKey: false, unique: false, };
    export type string_ = { type: string | null, primaryKey: false, unique: false, };
    export type moneyCol = { type: number | null, primaryKey: false, unique: false, };
    export type charCol = { type: string | null, primaryKey: false, unique: false, };
    export type timeCol = { type: string | null, primaryKey: false, unique: false, };
    export type inetCol = { type: string | null, primaryKey: false, unique: false, };
    export type jsonbCol = { type: Object | null, primaryKey: false, unique: false, };
    export type numericCol = { type: number | null, primaryKey: false, unique: false, };
    export type byteaCol = { type: string | null, primaryKey: false, unique: false, };
    export type boolArrayCol = { type: Array<boolean> | null, primaryKey: false, unique: false, };
    export type varcharArrayCol = { type: Array<string> | null, primaryKey: false, unique: false, };
    export type int2ArrayCol = { type: Array<number> | null, primaryKey: false, unique: false, };
    export type int4ArrayCol = { type: Array<number> | null, primaryKey: false, unique: false, };
    export type int8ArrayCol = { type: Array<number> | null, primaryKey: false, unique: false, };
    export type uuidArrayCol = { type: Array<string> | null, primaryKey: false, unique: false, };
    export type textArrayCol = { type: Array<string> | null, primaryKey: false, unique: false, };
    export type byteaArrayCol = { type: Array<string> | null, primaryKey: false, unique: false, };
    export type realCol = { type: number | null, primaryKey: false, unique: false, };
    export type doubleCol = { type: number | null, primaryKey: false, unique: false, };
    export type timeWithTz = { type: string | null, primaryKey: false, unique: false, };
    export type oidCol = { type: number | null, primaryKey: false, unique: false, };
    export type intervalCol = { type: string | null, primaryKey: false, unique: false, };
    export type jsonCol = { type: Object | null, primaryKey: false, unique: false, };
    export type dateCol = { type: Date | null, primaryKey: false, unique: false, };
    export type unspportedPathType = { type: any | null, primaryKey: false, unique: false, };
    export type nameTypeCol = { type: string | null, primaryKey: false, unique: false, };
    export type jsonArrayCol = { type: Array<Object> | null, primaryKey: false, unique: false, };
    export type jsonbArrayCol = { type: Array<Object> | null, primaryKey: false, unique: false, };
    export type timestamptzArrayCol = { type: Array<Date> | null, primaryKey: false, unique: false, };

}

interface UsersMeta {
    email: UsersFields.email;
    id: UsersFields.id;
    passCrypt: UsersFields.passCrypt;
    creationTime: UsersFields.creationTime;
    displayName: UsersFields.displayName;
    dataPublic: UsersFields.dataPublic;
    description: UsersFields.description;
    homeLat: UsersFields.homeLat;
    homeLon: UsersFields.homeLon;
    homeZoom: UsersFields.homeZoom;
    nearby: UsersFields.nearby;
    passSalt: UsersFields.passSalt;
    imageFileName: UsersFields.imageFileName;
    emailValid: UsersFields.emailValid;
    newEmail: UsersFields.newEmail;
    creationIp: UsersFields.creationIp;
    languages: UsersFields.languages;
    status: UsersFields.status;
    termsAgreed: UsersFields.termsAgreed;
    considerPd: UsersFields.considerPd;
    preferredEditor: UsersFields.preferredEditor;
    termsSeen: UsersFields.termsSeen;
    authUid: UsersFields.authUid;
    descriptionFormat: UsersFields.descriptionFormat;
    imageFingerprint: UsersFields.imageFingerprint;
    changesetsCount: UsersFields.changesetsCount;
    tracesCount: UsersFields.tracesCount;
    diaryEntriesCount: UsersFields.diaryEntriesCount;
    imageUseGravatar: UsersFields.imageUseGravatar;
    imageContentType: UsersFields.imageContentType;
    authProvider: UsersFields.authProvider;
    uuidColumn: UsersFields.uuidColumn;
    number: UsersFields.number_;
    string: UsersFields.string_;
    moneyCol: UsersFields.moneyCol;
    charCol: UsersFields.charCol;
    timeCol: UsersFields.timeCol;
    inetCol: UsersFields.inetCol;
    jsonbCol: UsersFields.jsonbCol;
    numericCol: UsersFields.numericCol;
    byteaCol: UsersFields.byteaCol;
    boolArrayCol: UsersFields.boolArrayCol;
    varcharArrayCol: UsersFields.varcharArrayCol;
    int2ArrayCol: UsersFields.int2ArrayCol;
    int4ArrayCol: UsersFields.int4ArrayCol;
    int8ArrayCol: UsersFields.int8ArrayCol;
    uuidArrayCol: UsersFields.uuidArrayCol;
    textArrayCol: UsersFields.textArrayCol;
    byteaArrayCol: UsersFields.byteaArrayCol;
    realCol: UsersFields.realCol;
    doubleCol: UsersFields.doubleCol;
    timeWithTz: UsersFields.timeWithTz;
    oidCol: UsersFields.oidCol;
    intervalCol: UsersFields.intervalCol;
    jsonCol: UsersFields.jsonCol;
    dateCol: UsersFields.dateCol;
    unspportedPathType: UsersFields.unspportedPathType;
    nameTypeCol: UsersFields.nameTypeCol;
    jsonArrayCol: UsersFields.jsonArrayCol;
    jsonbArrayCol: UsersFields.jsonbArrayCol;
    timestamptzArrayCol: UsersFields.timestamptzArrayCol;

}

export type Users = SimpleSchema<UsersMeta>

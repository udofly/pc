export interface RootStateTypes {
    text: string,
    loading: boolean
}

export interface VantTypes {
    name: string
    count: number
}

export interface PoppyTypes {
    appId: string,
    core: object,
}

export interface UserTypes {
    token: string,
    user: object,
    im: object,
    message: object,
    imConnected: boolean
}

export interface PcTypes {
    recentList: object,
    emit: object,
    token: string,
    imAccid: string,
    imToken: string,
    imConnected: boolean,
    imSearch: boolean,
    lastMsg: object,
    tid: string,
    sessionId: string,
    sessionType: string,
    session: object,
    unReadNum: number,
    message: {},
    imUser: object,
    imCraft: object
}


export interface AllStateTypes extends RootStateTypes {
    vant: VantTypes,
    poppy: PoppyTypes,
    user: UserTypes,
    pc: PcTypes,
}



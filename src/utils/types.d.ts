type RequestOptions = {
    method?: string,
    from?: string,
    url: string,
    params?: any,
    headers?: any
}


type ImRequestOptions = {
    from?: string,
    url: string,
    params?: any,
    headers?: any
}

declare module socketSessionMessage {

    export interface LastMsg {
        message_id: number;
        timestamp: number;
        type: number;
        body: string;
    }

    export interface Response {
        session_id: string;
        last_msg: LastMsg;
    }

}


declare module socketEmitMessage {

    export interface Content {
        from: string;
        to: string;
        ope: number;
        type: number;
        body: string;
    }

    export interface From {
        uid: string;
        icon: string;
        name: string;
        ext: string;
    }

    export interface Body {
        content: Content;
        from: From;
    }

    export interface Data {
        msg_id: number;
        timestamp: number;
        ope: number;
        session: string;
        data: Body;
    }

    export interface Response {
        status: number;
        message: string;
        data: Data;
    }

}


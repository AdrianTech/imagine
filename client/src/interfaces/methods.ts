export interface Setup {
    path: string,
    method: 'get' | 'post' | 'patch' | 'put' | 'delete',
    body?: object,
    withCredentials?: boolean,
    headers?: object
}

export interface HttpRequester {
    data?: object[],
    error?: string,
}
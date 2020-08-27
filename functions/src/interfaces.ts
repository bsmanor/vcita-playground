export interface IVcitaAuthorizeResponse {
    code: string;
    state?: string;
    uid?: string;
}

export interface IVcitaTokenExchangeResponse {
    access_token: string;
    token_type: string;
    expires_in: string;
    created_at: string;
}

export interface IVcitaUserInfoResponse {
    sub: string;
    business_id: string;
    business_name: string;
    email: string;
    role: string;
}
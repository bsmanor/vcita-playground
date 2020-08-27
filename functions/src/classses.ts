import { AxiosRequestConfig } from 'axios';


export class VcitaTokenExchange {
    config: AxiosRequestConfig = {
      method: 'POST',
      url: 'https://api.vcita.biz/oauth/token',
      params: {
        grant_type: 'authorization_code', 
        code: '',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: 'https://us-central1-vcita-playground.cloudfunctions.net/authorize'
      }
    } 
    constructor(code: any) {
        this.config.params.code = code.toString();
    }
}

export class GetUserByToken {
  config: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://api.vcita.biz/oauth/userinfo',
    headers: {
      'Content-Type':  'application/json',
      Authorization: ``
    }
  }

    constructor(token: string) {
        this.config.headers.Authorization = `Bearer ${token}`
    }
}
import * as Axios from 'axios';
const axios = Axios.default;
type AxiosRequestConfig = Axios.AxiosRequestConfig;


export async function subscribeToVcitaWebhook(token:string, event:string) {
      
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: 'https://api.vcita.biz/platform/v1/webhook/subscribe',
        data: {
            event: event,
            target_url: 'https://us-central1-vcita-playground.cloudfunctions.net/vcitaClientCreatedWebhook'
        },
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }

    return axios(config);
        
}

export async function importClients(token:string) {
      
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: 'https://api.vcita.biz/platform/v1/clients',
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }

    return axios(config);
        
}
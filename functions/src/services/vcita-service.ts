const axios = require('axios');

interface IClient {
    first_name: string;
    last_name: string;
    email: string;
}

export const createClient = (accessToken:string, client: IClient) => {
    const config = {
        method: 'POST',
        url: 'https://api.vcita.biz/platform/v1/clients',
        data: client,
        headers: {
            accept: 'application/json',
            authorization: `Bearer ${accessToken}`,
            'content-type': 'application/json'
          }
    }
    return axios(config)
    
}
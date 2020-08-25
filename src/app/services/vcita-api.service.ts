import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VcitaApiService {

  constructor(private http: HttpClient) { }

  apiToken = '8fe07e4a21e51416e21e2b6265cc289c7e5ebe81b02feb276c44e5e89debf56a';
  testApiToken = 'b685a53ab31efa57e4898bf21b00dba6658cabffdb43e6c629a4b53da40bd387';
  
  businessId = 'ua48ta14yoqqz3r3';
  testBusinessId = 'ua48ta14yoqqz3r3';

  domain = 'https://api.vcita.biz';
  // testDomain = 'https://api-int.vchost.co';
  testDomain = 'https://api2.meet2know.com';
  
  headers = new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: `Bearer ${this.apiToken}`
  })

  testHeaders = new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: `Bearer ${this.testApiToken}`
  })

  getServicesList() {
    let config = {
      headers: this.headers,
      params: new HttpParams().set('business_id', this.businessId)
    }
    return this.http.get(`${this.domain}/platform/v1/services`, config);
  }

  getClients(page=1, perPage=50) {
    let config = {
      headers: this.headers
    }
    return this.http.get(`${this.domain}/platform/v1/clients?page=${page}&per_page=${perPage}`, config);
  }

  getConversations(page, perPage) {
    let config = {
      headers: this.headers
    }
    // return this.http.get(`${this.testDomain}/platform/v1/conversations?page=${page}&per_page=${perPage}`, config); // Testing domain
    return this.http.get(`${this.domain}/platform/v1/conversations?page=${page}&per_page=${perPage}`, config);
  }

  getClientConversations(clientId) {
    let config = {
      headers: this.headers
    }
    return this.http.get(`${this.domain}/platform/v1/clients/${clientId}/conversations`, config);
  }

  getServiceAvailabilityByID(serviceId) {
    let config = {
      headers: this.headers
    }
    return this.http.get(`${this.domain}/platform/v1/services/${serviceId}/availability`, config);
  }

  getAuthCode() {
    let config = {
      params: new HttpParams()
      .set('client_id', '53c0ab7c3eb6b5aefcfc3f657f539849cb18e9f9e6c76ffffef743db4c137a1a')
      .set('redirect_uri', 'https://us-central1-vcita-playground.cloudfunctions.net/authorize')
    }

    return this.http.get('https://app.vcita.com/app/oauth/authorize', config)
  }

  subscribeToWebhook(object, event, url) {
    let config = {
      headers: this.headers
    }

    const bodyParams = {
      event: `${object}/${event}`,
      target_url: url
    }

    return this.http.post(`${this.domain}/platform/v1/webhook/subscribe`, bodyParams, config);
  }

}


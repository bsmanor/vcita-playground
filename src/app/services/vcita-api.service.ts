import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VcitaApiService {

  constructor(private http: HttpClient) { }

  apiToken = '8fe07e4a21e51416e21e2b6265cc289c7e5ebe81b02feb276c44e5e89debf56a';
  businessId = 'ua48ta14yoqqz3r3';

  domain = 'https://api.vcita.biz';
  
  headers = new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: `Bearer ${this.apiToken}`
  })

  getServicesList() {
    let config = {
      headers: this.headers,
      params: new HttpParams().set('business_id', this.businessId)
    }
    return this.http.get(`${this.domain}/platform/v1/services`, config);
  }

  getClients() {
    let config = {
      headers: this.headers
    }
    return this.http.get(`${this.domain}/platform/v1/clients`, config);
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

}


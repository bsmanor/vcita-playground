import { Component, OnInit } from '@angular/core';
import { VcitaApiService } from 'src/app/services/vcita-api.service';

@Component({
  selector: 'app-api-playground',
  templateUrl: './api-playground.component.html',
  styleUrls: ['./api-playground.component.css']
})
export class ApiPlaygroundComponent implements OnInit {

  constructor(private vcita: VcitaApiService) {}

  clientsPage = 1;
  conversationsPage = 1;
  perPage = 10;
  clientId = '96jvae8v2nn1c6oq';

  webhookObject = '';
  webhookEvent = '';
  webhookUrl = '';

  OAuthUrl = 'https://app.vcita.com/app/oauth/authorize?client_id=53c0ab7c3eb6b5aefcfc3f657f539849cb18e9f9e6c76ffffef743db4c137a1a&redirect_uri=https://us-central1-vcita-playground.cloudfunctions.net/authorize&state=test';
  services$ = this.vcita.getServicesList();
  clients$ = this.vcita.getClients(this.clientsPage);

  getServices() {
    this.vcita.getServicesList().subscribe((res) => {
      console.log(res);
    },
    err => {
      console.log(err);
    })
  }

  getClients(page) {
    this.clientsPage = page;
    this.vcita.getClients(page).subscribe((res) => {
      console.log(res);
    },
    err => {
      console.log(err);
    })
  }

  getConversations(page) {
    this.conversationsPage = page;
    this.vcita.getConversations(page, this.perPage).subscribe((res) => {
      console.log(res);
    },
    err => {
      console.log(err);
    })
  }

  getClientConversations(clientId) {
    this.vcita.getClientConversations(clientId).subscribe((res) => {
      console.log(res);
    },
    err => {
      console.log(err);
    })
  }

  getServiceAvailabilityByID(serviceId) {
    this.vcita.getServiceAvailabilityByID(serviceId).subscribe((res) => {
      console.log(res);
    },
    err => {
      console.log(err);
    })
  }

  subscribeToWebhook() {
    this.vcita.subscribeToWebhook(this.webhookObject, this.webhookEvent, this.webhookUrl).subscribe(res => {
      console.log(res);
    },
    err => {
      console.log(err);
    })
    this.webhookObject = '';
    this.webhookEvent = '';
    this.webhookUrl = '';
  }

  getDocuments(clientId = this.clientId) {
    this.vcita.getDocuments(clientId).subscribe(res => {console.log(res) });
  }


  ngOnInit() {
    this.getClients(this.clientsPage)
  }
}

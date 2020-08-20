import { VcitaApiService } from './services/vcita-api.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private vcita: VcitaApiService) {}

  OAuthUrl = 'https://app.vcita.com/app/oauth/authorize?client_id=53c0ab7c3eb6b5aefcfc3f657f539849cb18e9f9e6c76ffffef743db4c137a1a&redirect_uri=https://us-central1-vcita-playground.cloudfunctions.net/authorize&state=test';
  services$: Observable<any>;

  getServices() {
    this.services$ = this.vcita.getServicesList();
    this.vcita.getServicesList().subscribe((res) => {
      console.log(res);
    },
    err => {
      console.log(err);
    })
  }

  getClients() {
    this.vcita.getClients().subscribe((res) => {
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

}

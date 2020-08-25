import { AuthService } from './../../services/auth.service';
import { ClientsComponent } from './../clients/clients.component';
import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { VcitaApiService } from 'src/app/services/vcita-api.service';


@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.css']
})
export class OauthComponent implements OnInit {

  constructor(
    private vcita: VcitaApiService,
    private firestore: FirestoreService,
    private auth: AuthService  
  ) { }

  OAuthUrl = 'https://app.vcita.com/app/oauth/authorize?client_id=53c0ab7c3eb6b5aefcfc3f657f539849cb18e9f9e6c76ffffef743db4c137a1a&redirect_uri=https://us-central1-vcita-playground.cloudfunctions.net/authorize&state=test';
  clients$ = this.firestore.getClients();

  createUser(email, password) {
    this.auth.createUser(email, password)
    .then(res => {
      console.log(res)
      this.firestore.addUser(res.user.uid)
      .then(res2 => {console.log(res2)});
    })
    .catch(err => {console.log(err)})
  }

  ngOnInit(): void {
  }

}

import { IUser } from './../../interfaces';
import { Observable } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { ClientsComponent } from './../clients/clients.component';
import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit, Inject } from '@angular/core';
import { VcitaApiService } from 'src/app/services/vcita-api.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {BrowserModule, DomSanitizer, SafeResourceUrl} from '@angular/platform-browser'


@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.css']
})
export class OauthComponent implements OnInit {

  constructor(
    private vcita: VcitaApiService,
    private firestore: FirestoreService,
    private auth: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  clients$: Observable<any>;
  uri = `https://us-central1-vcita-playground.cloudfunctions.net/authorize`;
  OAuthUrl = `https://app.vcita.com/app/oauth/authorize?client_id=53c0ab7c3eb6b5aefcfc3f657f539849cb18e9f9e6c76ffffef743db4c137a1a&redirect_uri=${this.uri}&state=${this.auth.user.uid}`;

  user: Observable<IUser>;
  openSyncDialog() {
    this.dialog.open(vcitaDialog, {
      data: {
        uid: this.auth.uid
      },
      width:'1600px',
      height: '700px'
    })
  }

  unsyncVcita() {
    this.firestore.unsyncVcita(this.auth.uid);
  }
  
  webhooks = [
    {
      client: [
        {created: 'client/created'},
        {updated: 'client/updated'}
      ]
    },
    {
      invoice: [
        {issued: 'invoice/issued'}
      ]
    },
    {
      payment: [
        {recorded: 'payment/recorded'},
        {refunded: 'payment/refunded'}
      ]
    },
    {
      message: [
        {business_sent_message: 'message/business_sent_message'},
        {client_sent_message: 'message/client_sent_message'}
      ]
    },
    {
      appointment: [
        {requested: 'appointment/requested'},
        {scheduled: 'appointment/scheduled'},
        {rescheduled: 'appointment/rescheduled'},
        {cancelled: 'appointment/cancelled'},
        {reminder_sent: 'appointment/reminder_sent'}
      ]
    },
    {
      review: [
        {submitted: 'review/submitted'}
      ]
    },
    {
      estimate: [
        {requested: 'estimate/requested'},
        {rejected: 'estimate/rejected'},
        {approved: 'estimate/approved'}
      ]
    },
    {
      document: [
        {created: 'document/created'}
      ]
    },
    {
      event: [
        {created: 'event/created'},
        {updated: 'event/updated'}
      ]
    },
    {
      app_subscription: [
        {created: 'app_subscription/installed'},
        {updated: 'app_subscription/uninstalled'}
      ]
    }
  ]
  
  ngOnInit(): void {
    console.log(this.auth.uid);
    
    if (this.auth.uid === null || this.auth.uid === undefined) {
      this.router.navigate(['sign-in'])
    } 
    else {
      try {
        this.clients$ = this.firestore.getClients(this.auth.uid);
        this.user = this.firestore.getUser(this.auth.uid)
        this.firestore.getUser(this.auth.uid)
        .subscribe((user: IUser) => {
          console.log(user)
          if (!user.vcita_access) {
            this.openSyncDialog();
          }

        },
        err => {
          console.log(err);
        }).unsubscribe();
      }
      catch (err) {
        this.router.navigate(['sign-in'])
      }
    }
  }

}

@Component({
  selector: 'vcita-dialog',
  templateUrl: 'vcita-dialog.html',
})
export class vcitaDialog implements OnInit {

  uri: string;
  OAuthUrl: string;
  iframeUrl: SafeResourceUrl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.uri = `https://us-central1-vcita-playground.cloudfunctions.net/authorize`;
    this.OAuthUrl = `https://app.vcita.com/app/oauth/authorize?client_id=53c0ab7c3eb6b5aefcfc3f657f539849cb18e9f9e6c76ffffef743db4c137a1a&redirect_uri=${this.uri}&state=${this.data.uid}`;
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.OAuthUrl);
  }


  ngOnInit() {    
  }

}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: string;

  set user (uid: string) {
    this._user = uid;
  }

  get user (): string {
    return this._user;
  }

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) { }


  createUser(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

}

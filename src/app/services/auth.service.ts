import { User } from './../classes';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface IUser {
  uid: string;
  businessId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: IUser;

  
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this._user = new User();
  }
    
  set uid (uid: string) {
    this._user.uid = uid;
  }

  set businessId (businessId: string) {
    this._user.businessId = businessId;
  }
  
  get user (): IUser {
    return this._user;
  }
  get uid (): string {
    return this._user.uid;
  }
  get businessId (): string {
    return this._user.businessId;
  }

  createUser(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  signInWithEmailAndPassword(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

}

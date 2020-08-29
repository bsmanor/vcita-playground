import { IUser } from './../interfaces';
import { FirestoreService } from './firestore.service';
import { User } from './../classes';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: IUser;
  userData: any; // User data var
  user$: Observable<IUser>;
  
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    ) 
  {
    this._user = new User();
    this.authenticateUser();

  }
    
  set uid (uid: string) {
    this._user.uid = uid;
  }

  set businessId (businessId: string) {
    this._user.business_id = businessId;
  }
  
  get user (): IUser {
    return this._user;
  }
  get uid (): string {
    return this._user.uid;
  }
  get businessId (): string {
    return this._user.business_id;
  }

  authenticateUser() {
    // Saving user data as an object in localstorage if logged out than set to null 
    this.afAuth.authState.subscribe(user => {
      
      if (user) {
        this.userData = user; // Setting up user data in userData var
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
        this._user.uid = JSON.parse(localStorage.getItem('user')).uid;
        return this.uid;
        
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
        return false;
      }
    })
  }

  createUser(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  signInWithEmailAndPassword(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }


}

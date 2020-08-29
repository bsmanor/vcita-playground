import { IUser } from './../interfaces';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  clients$: Observable<any[]>;
  users: AngularFirestoreCollection<any[]>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.users = this.afs.collection('users');
  }

  getClients(uid) {
      return this.users.doc(uid).collection('clients').valueChanges();
  }

  addUser(uid) {
    return this.users.doc(uid).set({uid: uid});
  }

  getUser(uid) {
      return this.users.doc(uid).valueChanges();
  }

  unsyncVcita(uid) {
    return this.users.doc(uid).update({vcita_access: false});
  }

}

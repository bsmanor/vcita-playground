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
    private afs: AngularFirestore,
    private auth: AuthService
  ) {
    this.users = afs.collection('users');
  }

  // get clients(): any {
  //   return this.afs.collection('users').doc(this.businessId).collection('sub-users').valueChanges();
  // }
  getClients() {
    return this.users.doc(this.auth.uid).collection('clients').valueChanges();
  }

  addUser(uid) {
    return this.users.doc(uid).set({uid: uid});
  }

  getUser(uid) {
    return this.users.doc(this.auth.uid).get();
  }

}

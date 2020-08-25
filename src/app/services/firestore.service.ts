import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  clients$: Observable<any[]>;
  businessId = 'ua48ta14yoqqz3r3';

  constructor(private firestore: AngularFirestore) {}

  // get clients(): any {
  //   return this.firestore.collection('users').doc(this.businessId).collection('sub-users').valueChanges();
  // }
  getClients() {
    return this.firestore.collection('users').doc(this.businessId).collection('sub-users').valueChanges();
  }

  addUser(uid) {
    return this.firestore.collection('users').add(uid);
  }

}

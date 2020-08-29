import * as admin from 'firebase-admin';
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});
const db = admin.firestore();

export function getUserByUid(uid: string) {
    return db.collection('users').doc(uid).get();
}

export function createClients(uid: string, clients: any[]) {
  const clientsPromList: any[] = [];
  clients.forEach(client => {
    clientsPromList.push(db.collection('users').doc(uid).collection('clients').doc(client.id).set(client));
  })

  return Promise.all(clientsPromList);

}

export async function findUidByBusinessId(businessId: string): Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>> {
  return await db.collection('users').where('business_id', '==', businessId).get();
  
}

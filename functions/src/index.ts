import { VcitaTokenExchange, GetUserByToken } from './classses';
import * as functions from 'firebase-functions';
import * as firestore from './firestore';
import * as vcita from './services/vcita-service';
require('dotenv').config();
// const https = require('https');
// import * as express from 'express';
// const app = express();
import * as Axios from 'axios';
const axios = Axios.default;
type AxiosRequestConfig = Axios.AxiosRequestConfig;

// Firebase Cloud Firestore
import * as admin from 'firebase-admin';
// admin.initializeApp({
//   credential: admin.credential.applicationDefault()
// });
const db = admin.firestore();

// const cors = require('cors')({ origin: true });

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

// firebase deploy --only functions
// firebase deploy --only functions:functionName1,functions:functionName2

export const getAuthCode = functions.https.onRequest(async (request, response) => {
  
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: 'http://app.vcita.com/app/oauth/authorize',
    params: {
      client_id: process.env.CLIENT_ID,
      redirect_uri: 'https://us-central1-vcita-playground.cloudfunctions.net/authorize',
      state: 'TEST'
    }
  }
  
  const myRes = await axios(config);
  response.send(myRes.data)
});


// This endpoint receives a temporary code from vcita and will later exchange it with a token that can be later used for identifying users.
export const authorize = functions.https.onRequest( async (request, response) => {
  const code = request.query.code;
  const uid = request.query.state?.toString();
  functions.logger.info({uid: uid}, {structuredData: true});
  
  if (uid) {
    
    try {
      functions.logger.info('trying...', {structuredData: true});
      // Constructing the request params for the exchange-token request
      const exchangedTokenConfig = new VcitaTokenExchange(code);
      const accessToken = await axios(exchangedTokenConfig.config);
      const token = accessToken.data.access_token;
      functions.logger.info({token: token}, {structuredData: true});
      
      // Constructing the request params for getting the user associated with a given token
      const getUserByTokenConfig = new GetUserByToken(token);
      const vuser = await axios(getUserByTokenConfig.config);

      // Add vcita user info to the user's account on firestore
      await db.collection('users').doc(uid).set({
        uid: uid,
        vcita_access: true,
        business_id: vuser.data.business_id,
        vcita_token: token,
        vcita_user: vuser.data,
        vcita_client_added_webhook: false,
        imported_vcita_clients: false
      });

      try {
        
        // subscribe to client/created vcita webhook
        const isSubscribed = await vcita.subscribeToVcitaWebhook(token, 'client/created');
        functions.logger.info({subscribed:isSubscribed.data}, {structuredData: true});
        // updating the user's account that client/added event are now synced
        await db.collection('users').doc(uid).update({vcita_client_added_webhook: true})
        
        // Importing clients from vcita
        const clientsRes = await vcita.importClients(token);
        const clients = clientsRes.data.data.clients;
        functions.logger.info({clients:clients}, {structuredData: true});
        // updating the user's account that clients were imported from vcita
        await db.collection('users').doc(uid).update({imported_vcita_clients: true})

        // Push clients to firestore
        firestore.createClients(uid, clients)
        .then( (values) => {          
          // Redirect the user to the app's home page
          response.redirect(`https://vcita-playground.web.app/vcita-thank-you-page`);
        })
        .catch(err => {
          functions.logger.info({err:err.data}, {structuredData: true});
          response.status(500).json(err)
        })
      }
      catch (err) {
        functions.logger.info({err:err}, {structuredData: true});
        response.status(500).json(err)
      }


    } catch (err) {
      functions.logger.info({loggedError: err}, {structuredData: true});
      response.json(err)
    }
  }
});

export const usersList = functions.https.onRequest( async (request, response) => {
  const usersRef = await db.collection('users').get();
  const usersArr: any[] = [];
  usersRef.forEach((element:any) => {
    usersArr.push(element.data())
  });
  
  functions.logger.info({dbRes: usersArr}, {structuredData: true})
  response.json({users: usersArr})
})

export const vcitaClientCreatedWebhook = functions.https.onRequest( async (request, response) => {
  functions.logger.info({
    params: request.params,
    body: request.body,
    query: request.query
  }, {structuredData: true});
  
  const user = request.body.data;
  user['status'] = request.body.custom_fields_status;
  
  const users: string[] = []; 
  (await firestore.findUidByBusinessId(request.body.data.business_id)).forEach(userRef => { users.push(userRef.data().uid)})

  functions.logger.info({usersRes: users}, {structuredData: true});
  functions.logger.info({user0: users[0]}, {structuredData: true});

  try {
    const dbRes = await db.collection('users').doc(users[0]).collection('clients').doc(user.client_id).set(user);
    functions.logger.info({dbRes: dbRes}, {structuredData: true});
    functions.logger.info({dbRes: dbRes}, {structuredData: true});
    response.json({
      user: user
    });
  } catch (err) {
    functions.logger.info({dbRes: err}, {structuredData: true})
  }
});

export const importVcitaClients = functions.https.onRequest(async (request, response) => {
  const uid = request.query.uid?.toString();
  if (uid) {
    try {
      const token = (await firestore.getUserByUid(uid)).data();
      response.json({token: token});
    }
    catch (err) {
      functions.logger.info({dbRes: err}, {structuredData: true});
      response.status(500).json({err: err});
    }
  } else {
    response.status(500).json({err: 'missing uid param in request url'});

  }
})


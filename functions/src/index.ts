import { VcitaTokenExchange, GetUserByToken } from './classses';
import * as functions from 'firebase-functions';
require('dotenv').config();
// const https = require('https');
// import * as express from 'express';
// const app = express();
const axios = require('axios').default;

// Firebase Cloud Firestore
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});
const db = admin.firestore();

// const cors = require('cors')({ origin: true });

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

// firebase deploy --only functions
// firebase deploy --only functions:functionName1,functions:functionName2

export const getAuthCode = functions.https.onRequest(async (request, response) => {
  
  const config = {
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

  try {
    // Constructing the request params for the exchange-token request
    const exchangedTokenConfig = new VcitaTokenExchange(code);
    const accessToken = await axios(exchangedTokenConfig);
    
    // Constructing the request params for getting the user associated with a given token
    const getUserByTokenConfig = new GetUserByToken(accessToken.data.access_token);
    const vuser = await axios(getUserByTokenConfig);

    const dbRes = await db.collection('users').doc(vuser.data.business_id).set({
      id: vuser.data.business_id,
      token: accessToken.data,
      user: vuser.data
    });
    functions.logger.info({dbres:dbRes}, {structuredData: true});
    response.redirect(`https://vcita-playground.web.app`)

    // response.json({
    //   code: code,
    //   token: accessToken.data,
    //   user: vuser.data.business_id
    // })
  } catch (err) {
    functions.logger.info({loggedError: err}, {structuredData: true});
    response.json(err)
  } 
});

export const users = functions.https.onRequest( async (request, response) => {
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
  
  let user = request.body.data;
  user['status'] = request.body.custom_fields_status;
  
  try {
    const dbRes = await db.collection('users').doc(request.body.data.business_id).collection('sub-users').doc(user.client_id).set(user);
    functions.logger.info({dbRes: dbRes}, {structuredData: true});
    response.json({
      user: user
    });
  } catch (err) {
    functions.logger.info({dbRes: err}, {structuredData: true})
  }
});
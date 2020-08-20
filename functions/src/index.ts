import * as functions from 'firebase-functions';
require('dotenv').config();
// const https = require('https');
// import * as express from 'express';
// const app = express();
const axios = require('axios').default;
// const cors = require('cors')({ origin: true });

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

// firebase deploy --only functions
// firebase deploy --only functions:functionName1,functions:functionName2

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const authorize = functions.https.onRequest( async (request, response) => {
  const code = request.query.code;
  const config1 = {
    method: 'POST',
    url: 'https://api.vcita.biz/oauth/token',
    params: {
      grant_type: 'authorization_code', 
      code: code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: 'https://us-central1-vcita-playground.cloudfunctions.net/authorize'
    }
  }

  const accessToken = await axios(config1);
  response.json({code: code, token: accessToken.data.access_token});
  // const config2 = {
  //   method: 'GET',
  //   url: 'https://api.vcita.biz/oauth/userinfo',
  //   headers: {
  //     'Content-Type':  'application/json',
  //     Authorization: `Bearer ${token}`
  //   }
  // }

  // response.json({
  //     params: request.params,
  //     body: request.body,
  //     query: request.query
  // });
});

export const vcitaClientCreatedWebhook = functions.https.onRequest((request, response) => {
  functions.logger.info("client created on my vcita account", {structuredData: true});
  response.json({
      params: request.params,
      body: request.body,
      query: request.query
    });
  });
  
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
})
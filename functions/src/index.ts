import * as functions from 'firebase-functions';
require('dotenv').config();
// const https = require('https');
// import * as express from 'express';
// const app = express();
const axios = require('axios').default;

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

// firebase deploy --only functions
// firebase deploy --only functions:functionName1,functions:functionName2

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const authorize = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.json({
      params: request.params,
      body: request.body,
      query: request.query
  });
});

export const vcitaClientCreatedWebhook = functions.https.onRequest((request, response) => {
  functions.logger.info("client created on my vcita account", {structuredData: true});
  response.json({
      params: request.params,
      body: request.body,
      query: request.query
    });
  });
  
export const getAuthCode = functions.https.onRequest((request, response) => {

  // const config = {
  //   method: 'GET',
  //   url: 'http://app.vcita.com/app/oauth/authorize',
  //   params: {
  //     client_id: process.env.CLIENT_ID,
  //     redirect_uri: 'https://us-central1-vcita-playground.cloudfunctions.net/authorize',
  //     state: 'TEST'
  //   }
  // }

  function test() {
    return new Promise((resolve, reject) => {
      axios('https://jsonplaceholder.typicode.com/todos/1')
      .then((res: any) => {
        resolve(res)   
      })
      .catch((err: any) => {
        reject(err)   
      })
    })
  }

  test()
  .then(res => {
    functions.logger.info(res, {structuredData: true})
    response.json(res)
  })
  .catch(err => {
    functions.logger.info(err, {structuredData: true})
    response.send(err)
  })

})
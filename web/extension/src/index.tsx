import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
// import browser from 'webextension-polyfill';

const App = () => {
  useEffect(() => {
    const redirectURL = window.chrome.identity.getRedirectURL();
    const { oauth2 } = window.chrome.runtime.getManifest();
    const clientId = oauth2.client_id;

    console.log({
      client_id: clientId,
      response_type: 'token',
      redirect_uri: redirectURL,
      scope: ['email'].join(' '),
    });

    const authParams = new URLSearchParams({
      client_id: clientId,
      response_type: 'token',
      redirect_uri: redirectURL,
      scope: ['email'].join(' '),
    });
    const authURL = `https://accounts.google.com/o/oauth2/auth?${authParams.toString()}`;

    window.chrome.identity.getAuthToken({ interactive: true }, function(token) {
      // Use the token.
    });

    return;

    window.chrome.identity
      .launchWebAuthFlow({ url: authURL, interactive: true })
      .then(responseUrl => {
        console.warn({ responseUrl, authURL });
        const url = new URL(responseUrl);
        const urlParams = new URLSearchParams(url.hash.slice(1));
        const params = Object.fromEntries(urlParams.entries()); // access_token, expires_in

        fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          },
        )
          .then(response => response.json())
          .then(data => {
            alert(JSON.stringify(data));
          });
      })
      .catch(error => {
        console.warn(error.message, authURL);
      });
  });

  return (
    <div style={{ width: '500px', height: '300px' }}>
      Your App injected to DOM correctly!
    </div>
  );
};

// // Message Listener function
// chrome.runtime.onMessage.addListener((request, sender, response) => {
//   // If message is injectApp
//   if (request.injectApp) {
//     // Inject our app to DOM and send response
//     injectApp();
//     response({
//       startedExtension: true,
//     });
//   }
// });

console.log(document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root'));

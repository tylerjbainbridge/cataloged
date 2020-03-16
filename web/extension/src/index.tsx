import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div style={{ width: '100px', height: '300px' }}>
        Your App injected to DOM correctly!
      </div>
    );
  }
}

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

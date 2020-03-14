// ==============
// Preload script
// ==============
const { remote } = require('electron');
const shell = require('electron').shell;

window.interop = {
  setBadgeCount(count) {
    return remote.app.setBadgeCount(count);
  },
};

document.addEventListener('click', event => {
  console.log(event.target.href);
  if (
    event.target.tagName === 'A' &&
    event.target.href.startsWith('http') &&
    !event.target.href.includes(
      'https://accounts.google.com/signin/oauth/oauthchooseaccount',
    )
  ) {
    // event.preventDefault();
    // shell.openExternal(event.target.href);
  }
});

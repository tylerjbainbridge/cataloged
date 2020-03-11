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
  if (event.target.tagName === 'A' && event.target.href.startsWith('http')) {
    event.preventDefault();
    shell.openExternal(event.target.href);
  }
});

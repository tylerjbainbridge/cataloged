// ==============
// Preload script
// ==============
const { remote } = require('electron');

window.interop = {
  setBadgeCount(count) {
    return remote.app.setBadgeCount(count);
  },
};

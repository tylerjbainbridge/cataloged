// ==============
// Main process
// ==============
const { app, BrowserWindow, nativeImage } = require('electron');
const path = require('path');

// const { autoUpdater } = require('electron-updater');

// class AppUpdater {
//   constructor() {
//     const log = require('electron-log');
//     log.transports.file.level = 'debug';
//     autoUpdater.logger = log;
//     autoUpdater.checkForUpdatesAndNotify();
//   }
// }

app.on('ready', () => {
  const iconPath = path.join(__dirname, 'build', './icon.png');

  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      // ...
    },
  });

  // win.setIcon(iconPath);

  win.loadURL('https://app.cataloged.co/', { userAgent: 'Chrome' });

  app.userAgentFallback = app.userAgentFallback.replace(
    'Electron/' + process.versions.electron,
    '',
  );
});

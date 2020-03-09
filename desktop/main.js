// ==============
// Main process
// ==============
const { app, BrowserWindow, nativeImage } = require('electron');
const path = require('path');

app.on('ready', () => {
  const iconPath = path.join(__dirname, 'build', 'icon.icns');

  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    icon: iconPath,
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

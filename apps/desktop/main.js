// ==============
// Main process
// ==============
const { app, shell, BrowserWindow, nativeImage } = require('electron');
const path = require('path');
const url = require('url');

app.on('ready', () => {
  const iconPath = path.join(__dirname, 'build', 'icon.icns');

  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    icon: iconPath,
    titleBarStyle: 'hidden',
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true,
      // zoomFactor: 1.0,
      // ...
    },
  });

  // var windowTopBar = document.createElement('div');
  // windowTopBar.style.width = '100%';
  // windowTopBar.style.height = '32px';
  // windowTopBar.style.backgroundColor = '#000';
  // windowTopBar.style.position = 'absolute';
  // windowTopBar.style.top = windowTopBar.style.left = 0;
  // windowTopBar.style.webkitAppRegion = 'drag';
  // document.body.appendChild(windowTopBar);

  // win.setIcon(iconPath);

  // win.loadURL('https://app.cataloged.co/', { userAgent: 'Chrome' });

  console.log(path.join(__dirname, './index.html'));

  // win.loadURL(path.join(__dirname, './index.html'), {
  //   userAgent: 'Chrome',
  // });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
    }),
  );

  // win.loadFile('index.html');

  app.userAgentFallback = app.userAgentFallback.replace(
    'Electron/' + process.versions.electron,
    '',
  );
});

const KEEP_IN_APP = [
  'https://accounts.google.com/o/oauth2/v2/auth',
  'https://accounts.google.com/o/oauth2/v2/auth',
  'https://accounts.google.com/signin/oauth',
  'https://accounts.google.com/signin/oauth/oauthchooseaccount',
];

const shouldOpenInApp = url => KEEP_IN_APP.some(part => url.includes(part));

// To open links
app.on('web-contents-created', (e, contents) => {
  contents.on('new-window', (e, url) => {
    console.log(shouldOpenInApp(url), url);
    if (!shouldOpenInApp(url)) {
      e.preventDefault();
      shell.openExternal(url);
    }
  });
  contents.on('will-navigate', (e, url) => {
    if (url !== contents.getURL()) {
      if (!shouldOpenInApp(url)) {
        e.preventDefault();
        shell.openExternal(url);
      }
    }
  });
});

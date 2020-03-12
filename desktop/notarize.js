require('dotenv').config();
const { notarize } = require('electron-notarize');

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== 'darwin') {
    return;
  }

  const appName = context.packager.appInfo.productFilename;

  console.log('Notarizng...', `${appOutDir}/${appName}.app`);

  return await notarize({
    appBundleId: 'com.app.cataloged',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: 'tyler@tylerbainbridge.com',
    appleIdPassword: 'gjog-eyhe-mldq-gufu',
  });
};

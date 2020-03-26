const packager = require('electron-packager');

(async () => {
  const appPaths = await packager({
    name: 'Cataloged',
    path: './',
    platform: 'mas',
    arch: 'x64',
    appBundleId: 'com.app.cataloged',
    icon: './build/icon.icns',
    // extendInfo: process.env.npm_package_config_macos_plist_info,
    osxSign: {
      entitlements: './build/entitlements.mac.plist',
      'entitlements-inherit': './build/entitlements.mac.plist',
      hardenedRuntime: true,
    },
    'provisioning-profile': './embedded.provisionprofile',
    asar: {
      // unpack those node native binaries so that the notarization can examine these libraries.
      unpack: '*.node',
    },
    osxNotarize: {
      appleId: 'tyler@tylerbainbridge.com',
      appleIdPassword: 'gjog-eyhe-mldq-gufu',
    },
  });

  // console.log(`Electron app bundles created:\n${appPaths.join('\n')}`);
})();

// electron-packager . "Cataloged" --gatekeeperAssess=false --provisioning-profile="./prod.provisionprofile" --osx-sign.identity="QEA5QCYSWF" --platform=mas --asar.unpack="*.node" --osxNotarize.appleId="tyler@tylerbainbridge.com" --osxNotarize.appleIdPassword="gjog-eyhe-mldq-gufu" --osx-sign.hardenedRuntime=true --osx-sign.entitlements="./build/entitlements.mac.plist" --osx-sign.entitlements-inherit-"./build/entitlements.mac.plist" --icon="./build/icon.icns"

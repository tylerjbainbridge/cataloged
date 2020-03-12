electron-packager . "Cataloged" --app-bundle-id=com.myapp.macapp -- helper-bundle-id=com.myapp.macapp.helper --app-version=1.0.0 -- build-version=1.0.0 --platform=mas --arch=x64 --icon=build/icon.icns --overwrite

electron-osx-sign Cataloged-mas-x64/Cataloged.app

security find-identity -p codesigning -v

--osx-sign.identity="7DAB8550C9A06BD517AE39C8251A331925A12136"

embedded.provisionprofile

electron-osx-sign Cataloged-mas-x64/Cataloged.app

electron-packager . "Cataloged" --icon=build/icon.icns --entitlements=build/entitlements.mac.plist ---app-bundle-id=com.myapp.macapp

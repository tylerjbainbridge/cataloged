rm -rf node_modules
yarn cache clean -f
watchman watch-del-all
rm -rf $TMPDIR/metro*
rm -rf $TMPDIR/react-native*
yarn install
react-native start --reset-cache
watchman watch-del-all
rm -rf $TMPDIR/metro*
rm -rf $TMPDIR/react-native*
npx react-native start --reset-cache
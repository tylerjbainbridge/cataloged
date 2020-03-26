yarn cache clean -f
watchman watch-del-all
rm -rf $TMPDIR/metro*
rm -rf $TMPDIR/react-native*
react-native start --reset-cache
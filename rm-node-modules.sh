rm -rf node_modules
pushd server && rm -rf node_modules && popd
pushd web && rm -rf node_modules && popd
echo "DONE!"
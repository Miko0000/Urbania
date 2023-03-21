#/bin/sh

echo "DEPLOYING ] ";

git subtree push --prefix result.minify origin gh-pages # > deploy.log 2>&1

if test $? -eq 0; then
  printf "OK\n";
else
  printf "FAILED\n";
fi
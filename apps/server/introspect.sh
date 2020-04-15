FILE=../../.env

if test -f "$FILE"; then
  echo "found env file";
  source ../../.env;
fi

npx prisma introspect


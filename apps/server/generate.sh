FILE=../../.env

export sRUST_BACKTRACE="full"

if test -f "$FILE"; then
  echo "found env file";
  source ../../.env;
fi

npx prisma generate


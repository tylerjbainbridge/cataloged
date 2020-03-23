if [ -z "$POSTGRESQL_URL" ]
then
source ../../.env;
fi

echo "Running prisma generate ($POSTGRESQL_URL)";

prisma2 generate
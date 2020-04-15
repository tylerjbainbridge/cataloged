source ../../.env;

echo "Running prisma generate ($POSTGRESQL_URL)";

prisma migrate down --experimental
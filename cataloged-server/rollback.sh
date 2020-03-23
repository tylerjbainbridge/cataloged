source ../.env;

echo "Running prisma generate ($POSTGRESQL_URL)";

prisma2 migrate down --experimental
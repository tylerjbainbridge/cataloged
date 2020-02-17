source ../.env;

echo "Running prisma generate ($POSTGRESQL_URL)";

prisma2 generate
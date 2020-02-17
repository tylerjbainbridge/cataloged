source ../.env.production.local;

echo "Running prisma generate ($POSTGRESQL_URL)";

prisma2 migrate down --experimental
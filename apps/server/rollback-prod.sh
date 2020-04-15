source ../../.env.production.local;

echo "Running prisma generate ($POSTGRESQL_URL)";

prisma migrate down --experimental
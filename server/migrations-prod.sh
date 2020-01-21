source .env.production.local;

echo "Running production migrations: $POSTGRESQL_URL";

npx prisma2 migrate up --experimental

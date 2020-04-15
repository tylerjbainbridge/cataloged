source ../../.env.production.local;

# echo "Saving migrations ($POSTGRESQL_URL)";
# prisma2 migrate save --experimental
echo "Running migrations ($POSTGRESQL_URL)";
npx prisma migrate up --experimental
source ../../.env;

export DEBUG="*"

echo "Saving migrations";
npx prisma migrate save --experimental
echo "Running migrations ($POSTGRESQL_URL)";
npx prisma migrate up --experimental
echo "Generating types ($POSTGRESQL_URL)";
npx prisma generate

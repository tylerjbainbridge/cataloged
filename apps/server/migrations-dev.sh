source ../../.env;

export DEBUG="*"

echo "Saving migrations";
npx prisma2 migrate save --experimental
echo "Running migrations ($POSTGRESQL_URL)";
npx prisma2 migrate up --experimental
# echo "Generating types ($POSTGRESQL_URL)";
# npx prisma generate

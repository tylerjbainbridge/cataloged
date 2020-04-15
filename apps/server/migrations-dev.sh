source ../../.env;

export DEBUG="*"

echo "Saving migrations";
npx prisma2 migrate save --experimental
echo "Running migrations ($POSTGRESQL_URL)";
npx prisma2 migrate up --experimental
<<<<<<< HEAD
echo "Generating types ($POSTGRESQL_URL)";
npx prisma2 generate
=======
# echo "Generating types ($POSTGRESQL_URL)";
# npx prisma generate
>>>>>>> prisma-beta

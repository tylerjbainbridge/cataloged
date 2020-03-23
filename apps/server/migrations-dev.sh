source ../../.env;

echo "Saving migrations";
prisma2 migrate save --experimental
echo "Running migrations ($POSTGRESQL_URL)";
prisma2 migrate up --experimental
echo "Generating types ($POSTGRESQL_URL)";
prisma2 generate

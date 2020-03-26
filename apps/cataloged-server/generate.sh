if [ -f ../../.env ]; then
  source ../../.env;
fi

if [[ -z "${POSTGRESQL_URL}" ]]; then
  echo "Running prisma generate ($POSTGRESQL_URL)";
  prisma2 generate
else
  echo "Env variable POSTGRESQL_URL not found";
fi

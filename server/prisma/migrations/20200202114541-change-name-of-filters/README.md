# Migration `20200202114541-change-name-of-filters`

This migration has been generated by Tyler Bainbridge at 2/2/2020, 11:45:41 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."SavedSearchFilter" (
    "createdAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "id" text  NOT NULL ,
    "savedSearch" text   ,
    "updatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "user" text   ,
    "value" text   ,
    PRIMARY KEY ("id")
) 

ALTER TABLE "public"."SavedSearchFilter" ADD FOREIGN KEY ("savedSearch") REFERENCES "public"."SavedSearch"("id") ON DELETE SET NULL

ALTER TABLE "public"."SavedSearchFilter" ADD FOREIGN KEY ("user") REFERENCES "public"."User"("id") ON DELETE SET NULL

DROP TABLE "public"."Filter";
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200202114038-add-saved-search..20200202114541-change-name-of-filters
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("POSTGRESQL_URL")
 }
 model InviteCode {
   id String @id @default(cuid())
@@ -72,12 +72,12 @@
   version Int
   user User?
-  filters Filter[]
+  filters SavedSearchFilter[]
 }
-model Filter {
+model SavedSearchFilter {
   id        String   @id @default(cuid())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
```


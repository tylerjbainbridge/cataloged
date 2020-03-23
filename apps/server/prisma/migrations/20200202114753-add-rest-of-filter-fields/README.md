# Migration `20200202114753-add-rest-of-filter-fields`

This migration has been generated by Tyler Bainbridge at 2/2/2020, 11:47:53 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."SavedSearchFilter" ADD COLUMN "name" text  NOT NULL DEFAULT '',
ADD COLUMN "operator" text   ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200202114541-change-name-of-filters..20200202114753-add-rest-of-filter-fields
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
@@ -80,9 +80,11 @@
   id        String   @id @default(cuid())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
-  value String?
+  name     String
+  operator String?
+  value    String?
   user User?
   savedSearch SavedSearch?
```


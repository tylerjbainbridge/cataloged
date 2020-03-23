# Migration `20200319181646-add-last-visited-at-to-users`

This migration has been generated by Tyler Bainbridge at 3/19/2020, 6:16:46 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."User" ADD COLUMN "lastVisitedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200319164919-index-more-fields..20200319181646-add-last-visited-at-to-users
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
@@ -282,8 +282,10 @@
   id        String   @id @default(cuid())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
+  lastVisitedAt DateTime @default(now())
+
   email          String          @default("") @unique
   firstName      String?
   lastName       String?
   files          File[]
```


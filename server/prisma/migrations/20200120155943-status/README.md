# Migration `20200120155943-status`

This migration has been generated by Tyler Bainbridge at 1/20/2020, 3:59:43 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Item" DROP COLUMN "isResolved",
ADD COLUMN "status" text   ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200117092744-is-resolved..20200120155943-status
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("POSTGRESQL_URL")
 }
 model File {
   createdAt           DateTime
@@ -40,9 +40,9 @@
 model Item {
   createdAt   DateTime
   id          String   @id
   isFavorited Boolean  @default(false)
-  isResolved  Boolean  @default(false)
+  status      String?
   link        Link?
   note        Note?
   type        String   @default("")
   updatedAt   DateTime
```


# Migration `20200305175450-int-size`

This migration has been generated by Tyler Bainbridge at 3/5/2020, 5:54:50 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."File" DROP COLUMN "size",
ADD COLUMN "size" integer   ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200305174425-add-content-type..20200305175450-int-size
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
@@ -35,13 +35,14 @@
   extension           String   @default("")
   hasStartedUploading Boolean?
   height              Int?
-  isFailed    Boolean?
-  isUploaded  Boolean?
-  item        Item
-  name        String   @default("")
-  size        String?
+  isFailed   Boolean?
+  isUploaded Boolean?
+  item       Item
+  name       String   @default("")
+
+  size        Int?
   contentType String?
   title       String @default("")
   description String @default("")
```


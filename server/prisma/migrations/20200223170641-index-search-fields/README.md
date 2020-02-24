# Migration `20200223170641-index-search-fields`

This migration has been generated by Tyler Bainbridge at 2/23/2020, 5:06:41 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE  INDEX "File.title_description" ON "public"."File"("title","description")

CREATE  INDEX "Item.type" ON "public"."Item"("type")

CREATE  INDEX "Label.name" ON "public"."Label"("name")

CREATE  INDEX "Link.href_title_description" ON "public"."Link"("href","title","description")

CREATE  INDEX "Note.title" ON "public"."Note"("title")

CREATE  INDEX "GoogleContact.name_email_companyName_companyTitle" ON "public"."GoogleContact"("name","email","companyName","companyTitle")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200218195654-item-to-item..20200223170641-index-search-fields
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
@@ -47,8 +47,11 @@
   uploadGroup UploadGroup
   user        User
   width       Int?
+
+  @@index([title, description])
+
 }
 model GoogleAccount {
   id        String   @id @default(cuid())
@@ -95,8 +98,10 @@
   user          User
   item          Item
   googleAccount GoogleAccount
+
+  @@index([name, email, companyName, companyTitle])
 }
 model SavedSearch {
   id        String   @id @default(cuid())
@@ -148,8 +153,10 @@
   items Item[]
   labels Label[]
+
+  @@index([type])
 }
 model Label {
   id        String   @id @default(cuid())
@@ -159,8 +166,10 @@
   name String @default("")
   user  User
   items Item[]
+
+  @@index([name])
 }
@@ -178,8 +187,10 @@
   title       String?
   user User
   item Item?
+
+  @@index([href, title, description])
 }
 model Note {
   id        String   @id @default(cuid())
@@ -193,8 +204,9 @@
   user User
   item Item?
+  @@index([title])
 }
 model UploadGroup {
   id        String   @id @default(cuid())
```


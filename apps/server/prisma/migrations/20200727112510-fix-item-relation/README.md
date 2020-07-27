# Migration `20200727112510-fix-item-relation`

This migration has been generated at 7/27/2020, 11:25:10 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200514113140-init..20200727112510-fix-item-relation
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
   id        String   @default(cuid()) @id
@@ -171,31 +171,31 @@
 }
 // itemId          String?
 model Item {
-  id              String            @default(cuid()) @id
-  createdAt       DateTime          @default(now())
-  updatedAt       DateTime          @updatedAt
-  deletedAt       DateTime?
-  isFavorited     Boolean           @default(false)
-  status          String?           @default("NOT_STARTED")
-  type            String            @default("")
-  date            DateTime          @default(now())
-  linkId          String?
-  link            Link?             @relation(fields: [linkId], references: [id])
-  noteId          String?
-  note            Note?             @relation(fields: [noteId], references: [id])
-  fileId          String?
-  file            File?             @relation(fields: [fileId], references: [id])
-  googleContactId String?
-  googleContact   GoogleContact?    @relation(fields: [googleContactId], references: [id])
-  userId          String?
-  user            User?             @relation(fields: [userId], references: [id])
-  labels          Label[]           @relation(references: [id])
-  collections     Collection[]      @relation(references: [id])
-  ownedBy         Item[]            @relation("ItemToItem", references: [id])
-  items           Item[]            @relation("ItemToItem", references: [id])
-  CollectionEntry CollectionEntry[]
+  id                String            @default(cuid()) @id
+  createdAt         DateTime          @default(now())
+  updatedAt         DateTime          @updatedAt
+  deletedAt         DateTime?
+  isFavorited       Boolean           @default(false)
+  status            String?           @default("NOT_STARTED")
+  type              String            @default("")
+  date              DateTime          @default(now())
+  linkId            String?
+  link              Link?             @relation(fields: [linkId], references: [id])
+  noteId            String?
+  note              Note?             @relation(fields: [noteId], references: [id])
+  fileId            String?
+  file              File?             @relation(fields: [fileId], references: [id])
+  googleContactId   String?
+  googleContact     GoogleContact?    @relation(fields: [googleContactId], references: [id])
+  userId            String?
+  user              User?             @relation(fields: [userId], references: [id])
+  labels            Label[]           @relation(references: [id])
+  collections       Collection[]      @relation(references: [id])
+  ownedBy           Item[]            @relation("ItemToItem", references: [id])
+  items             Item[]            @relation("ItemToItem", references: [id])
+  collectionEntries CollectionEntry[]
   @@index([type, status, isFavorited, deletedAt])
 }
@@ -280,5 +280,5 @@
   role               String              @default("")
   isActive           Boolean             @default(false)
   inviteCodeId       String?
   inviteCode         InviteCode?         @relation(fields: [inviteCodeId], references: [id])
-}
+}
```



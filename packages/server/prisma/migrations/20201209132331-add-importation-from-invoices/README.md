# Migration `20201209132331-add-importation-from-invoices`

This migration has been generated by Arthur Santos at 12/9/2020, 10:23:34 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."invoices" ADD COLUMN "importation" boolean   NOT NULL DEFAULT false
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201009145032-add-invoice-number-and-provider-code-in-accompaniment..20201209132331-add-importation-from-invoices
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -222,10 +222,12 @@
   origin             InvoiceOrigin
   providerCode       Int
   number             Int
+
+  importation        Boolean   @default(false)
+
   value              Float?
-
   emittedAt          DateTime?
   key                String?
   weight             Float?
```


-- Type-specific fields for the new document types (repair job card, warranty
-- card, credit note, price list...). Nullable: existing receipts are unchanged.
ALTER TABLE "Receipt" ADD COLUMN "extra" JSONB;

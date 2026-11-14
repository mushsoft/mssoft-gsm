-- One-time content fix (no schema change): replace long dashes in text
-- customers see, using the same rules as src/lib/plainText.ts:
--   em dash "—" (with any surrounding spaces) -> ", "
--   en dash "–" (with any surrounding spaces) -> " to "
-- Only rows that actually contain a long dash are touched. New text saved
-- through the admin is cleaned by plainText.ts, so this only runs once.

UPDATE "Product" SET
  "title"       = regexp_replace(regexp_replace("title", '\s*—\s*', ', ', 'g'), '\s*–\s*', ' to ', 'g'),
  "description" = regexp_replace(regexp_replace("description", '\s*—\s*', ', ', 'g'), '\s*–\s*', ' to ', 'g'),
  "modelName"   = regexp_replace(regexp_replace("modelName", '\s*—\s*', ', ', 'g'), '\s*–\s*', ' to ', 'g'),
  "specs"       = regexp_replace(regexp_replace("specs"::text, '\s*—\s*', ', ', 'g'), '\s*–\s*', ' to ', 'g')::jsonb
WHERE "title" ~ '[—–]' OR "description" ~ '[—–]' OR "modelName" ~ '[—–]' OR "specs"::text ~ '[—–]';

UPDATE "RepairGuide" SET
  "title"     = regexp_replace(regexp_replace("title", '\s*—\s*', ', ', 'g'), '\s*–\s*', ' to ', 'g'),
  "content"   = regexp_replace(regexp_replace("content", '\s*—\s*', ', ', 'g'), '\s*–\s*', ' to ', 'g'),
  "modelName" = regexp_replace(regexp_replace("modelName", '\s*—\s*', ', ', 'g'), '\s*–\s*', ' to ', 'g')
WHERE "title" ~ '[—–]' OR "content" ~ '[—–]' OR "modelName" ~ '[—–]';

UPDATE "SoftwareTool" SET
  "title"    = regexp_replace(regexp_replace("title", '\s*—\s*', ', ', 'g'), '\s*–\s*', ' to ', 'g'),
  "category" = regexp_replace(regexp_replace("category", '\s*—\s*', ', ', 'g'), '\s*–\s*', ' to ', 'g')
WHERE "title" ~ '[—–]' OR "category" ~ '[—–]';

UPDATE "TestPoint" SET
  "title"     = regexp_replace(regexp_replace("title", '\s*—\s*', ', ', 'g'), '\s*–\s*', ' to ', 'g'),
  "modelName" = regexp_replace(regexp_replace("modelName", '\s*—\s*', ', ', 'g'), '\s*–\s*', ' to ', 'g'),
  "notes"     = regexp_replace(regexp_replace("notes", '\s*—\s*', ', ', 'g'), '\s*–\s*', ' to ', 'g')
WHERE "title" ~ '[—–]' OR "modelName" ~ '[—–]' OR "notes" ~ '[—–]';

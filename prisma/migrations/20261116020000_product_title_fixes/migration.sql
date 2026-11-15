-- One-time content fix (no schema change). Every update is guarded on the old
-- value, so anything changed in the admin since then is left alone.

-- Two pairs of different products shared one title (different price, photo
-- and specs). Give each its own name so shoppers and Google can tell them apart.
UPDATE "Product" SET "title" = 'Excellent 20,000mAh 3X Link Power Bank (Micro USB and Lightning)'
WHERE "slug" = 'excellent-20-000mah-3x-link-power-bank'
  AND "title" = 'Excellent 20,000mAh 3X Link Power Bank';

UPDATE "Product" SET "title" = 'Excellent 20,000mAh 3X Link Power Bank EX-062 (with Type-C)'
WHERE "slug" = 'excellent-20-000mah-3x-link-power-bank-munff7bj'
  AND "title" = 'Excellent 20,000mAh 3X Link Power Bank';

UPDATE "Product" SET "title" = 'Aojiw 1502AD DC Regulated Power Supply (Digital Display)'
WHERE "slug" = 'aojiw-1502ad-dc-regulated-power-supply'
  AND "title" = 'Aojiw 1502AD DC Regulated Power Supply';

UPDATE "Product" SET "title" = 'Aojiw 1502AD DC Power Supply with Ammeter and USB'
WHERE "slug" = 'aojiw-1502ad-dc-power-supply'
  AND "title" = 'Aojiw 1502AD DC Regulated Power Supply';

-- Typos.
UPDATE "Product" SET
  "title" = replace("title", 'Spaark', 'Spark'),
  "modelName" = replace("modelName", 'Spaark', 'Spark'),
  "description" = replace("description", 'Spaark', 'Spark')
WHERE "slug" = 'bg6-screen'
  AND ("title" LIKE '%Spaark%' OR "modelName" LIKE '%Spaark%' OR "description" LIKE '%Spaark%');

UPDATE "Product" SET "title" = replace("title", 'Screen YO1, Y02s Y10', 'Screen Y01, Y02s, Y10')
WHERE "slug" = 'vivo-universal-screen-y01-y02s'
  AND "title" LIKE '%Screen YO1, Y02s Y10%';

-- Two tip titles too long to show in full on Google.
UPDATE "RepairGuide" SET "title" = 'iPhone Sound Recognition: Alerts for Doorbells and Alarms'
WHERE "id" = 'software-tip-iphone-sound-recognition'
  AND "title" = 'Sound Recognition: iPhone Alerts for Doorbells, Alarms and Crying Babies';

UPDATE "RepairGuide" SET "title" = 'iPhone Background Sounds: Rain and Ocean Noise for Focus'
WHERE "id" = 'software-tip-iphone-background-sounds'
  AND "title" = 'Background Sounds: Rain and Ocean Noise to Help You Focus or Sleep (iPhone)';

-- One-time content update (no schema change): give the software tips that had
-- no brand one, so each lands under the right topic chip (iPhone, Android,
-- Windows, Linux, General) on the Software Tips page. Only blank brands are
-- filled, so anything set in the admin is kept.

UPDATE "RepairGuide" SET "brand" = 'Windows'
WHERE "category" = 'SOFTWARE' AND "brand" = ''
  AND ("id" LIKE 'software-tip-windows-%' OR "id" = 'software-tip-usb-drivers');

UPDATE "RepairGuide" SET "brand" = 'All brands'
WHERE "category" = 'SOFTWARE' AND "brand" = ''
  AND "id" = 'software-tip-mobile-money-scams';

-- Everything else that was unbranded was written for Android phones
-- (settings, flashing, FRP, backups).
UPDATE "RepairGuide" SET "brand" = 'Android'
WHERE "category" = 'SOFTWARE' AND "brand" = ''
  AND "id" LIKE 'software-tip-%';

-- One name for Windows tips on the cards.
UPDATE "RepairGuide" SET "brand" = 'Windows'
WHERE "category" = 'SOFTWARE' AND "brand" = 'Microsoft';

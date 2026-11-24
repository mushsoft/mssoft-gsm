-- Photo for the Cimino iPhone X screen, only while it has none.
UPDATE "Product" SET "images" = ARRAY['/products/cimino-iphone-x-screen-replacement-1.jpg']::text[], "updatedAt" = now()
WHERE "slug" = 'mino-iphone-x-screen-replacement' AND cardinality("images") = 0;

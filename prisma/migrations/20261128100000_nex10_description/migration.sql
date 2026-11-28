-- Plain description for the Nex 10 screen, only if nobody has edited it.
UPDATE "Product" SET "description" = 'TFT replacement screen labelled Nex 10. Display and touch. Confirm your exact phone model with us before ordering.', "updatedAt" = now()
WHERE "slug" = 'replacement-screen-labelled-nex-10-tft-grade-9-10'
  AND "description" = 'TFT screen marked only ''Nex 10'' by the supplier, grade 9/10 condition, no further brand/model identification visible. Confirm the exact phone model in-store before fitting.';

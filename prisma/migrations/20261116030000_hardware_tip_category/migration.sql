-- Adds the Hardware Tips category for /learn-to-repair/hardware-tips.
-- On its own migration: Postgres must commit a new enum value before rows use it.
ALTER TYPE "GuideCategory" ADD VALUE IF NOT EXISTS 'HARDWARE';

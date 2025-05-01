/*
  Warnings:

  - The values [Asian_American,East_Asian,South_East_Asian,South_Asian,Middle_Eastern] on the enum `EthenicityEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EthenicityEnum_new" AS ENUM ('White', 'Black', 'Asian American', 'East Asian', 'South East Asian', 'South Asian', 'Middle Eastern', 'Pacific', 'Hispanic');
ALTER TABLE "Model" ALTER COLUMN "ethinicty" TYPE "EthenicityEnum_new" USING ("ethinicty"::text::"EthenicityEnum_new");
ALTER TYPE "EthenicityEnum" RENAME TO "EthenicityEnum_old";
ALTER TYPE "EthenicityEnum_new" RENAME TO "EthenicityEnum";
DROP TYPE "EthenicityEnum_old";
COMMIT;

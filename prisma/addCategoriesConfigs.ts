/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.findMany({
    include: {
      CategoryConfig: true,
    },
  });

  const categoriesWithoutConfig = categories.filter(
    (item) => !item.CategoryConfig,
  );

  const configsToBeAdded = categoriesWithoutConfig.map((category) => ({
    defaultFloors: 0,
    defaultLength: 0,
    defaultWidth: 0,
    defaultPricePerSqFt: 0,
    fillPrice: true,
    fillDefaultFields: false,
    categoryId: category.id,
    createdById: category.createdById,
  }));

  console.log(configsToBeAdded);

  const addCategoryConfig = async () => {
    await prisma.categoryConfig.createMany({
      data: configsToBeAdded,
    });
  };

  await addCategoryConfig();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

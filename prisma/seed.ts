/* eslint-disable @typescript-eslint/no-misused-promises */
// app/prisma/seed.ts
import {
  type Locations,
  PrismaClient,
  type PropertyItem,
  type Category,
} from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
const locationNames = [
  "Kitchlu Nagar",
  "Haibowal",
  "Mayapuri",
  "Rishi Nagar",
  "Golf Links",
  "Civil Lines",
  "Chandar Nagar",
];
const categoryNames = [
  "House",
  "Flat",
  "Farmhouse",
  "Plot",
  "Godown",
  "Shop",
  "Mall",
  "Warehouse",
];
async function main() {
  //   await prisma.user.deleteMany({}); // use with caution.

  const seedProperties: PropertyItem[] = [];
  const seedLocations: Locations[] = [];
  const seedCategories: Category[] = [];

  const amountOfCategories = 8;
  for (let i = 0; i < amountOfCategories; i++) {
    const categories: Category = {
      id: faker.string.uuid(),
      name: categoryNames[i] ?? "",
    };

    seedCategories.push(categories);
  }

  const addCategories = async () =>
    await prisma.category.createMany({ data: seedCategories });
  await addCategories();

  // add locations
  const amountOfLocations = 7;
  for (let i = 0; i < amountOfLocations; i++) {
    const location: Locations = {
      id: faker.string.uuid(),
      name: locationNames[i] ?? "",
    };

    seedLocations.push(location);
  }

  console.log(seedLocations);

  const addLocations = async () =>
    await prisma.locations.createMany({ data: seedLocations });

  await addLocations();

  // add properties
  const locationIds = seedLocations.map((item) => item.id);
  const categoryId = seedCategories.map((item) => item.id);
  const amountOfProperties = 100;
  for (let i = 0; i < amountOfProperties; i++) {
    const randLoc = Math.floor(Math.random() * seedLocations.length);
    const randCat = Math.floor(Math.random() * seedCategories.length);
    const property: PropertyItem = {
      id: faker.string.uuid(),
      title: faker.word.words({ count: { min: 2, max: 4 } }),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      createdById: "clsyxob5h0000pr6ajolb5kyt",
      length: faker.number.float({ min: 10, max: 40 }),
      width: faker.number.float({ min: 20, max: 30 }),
      floors: faker.number.int({ min: 0, max: 3 }),
      area: faker.number.float({ min: 200, max: 1200 }),
      priority: null,
      address: faker.location.streetAddress(),
      locationId: locationIds[randLoc] ?? "",
      categoryId: categoryId[randCat] ?? "",
      brokerName: faker.person.fullName(),
      statusId: null,
    };

    seedProperties.push(property);
  }

  const addProperty = async () =>
    await prisma.propertyItem.createMany({ data: seedProperties });

  await addProperty();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

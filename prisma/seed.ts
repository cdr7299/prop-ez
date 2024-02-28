/* eslint-disable @typescript-eslint/no-misused-promises */
// app/prisma/seed.ts
import {
  type Locations,
  PrismaClient,
  type PropertyItem,
  type Category,
  type BrokerEntity,
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

const createdById = "clt51d2eb00009f7hsimxmx5n"; // IMPORTANT : add the user before the script runs

async function main() {
  const seedProperties: PropertyItem[] = [];
  const seedLocations: Locations[] = [];
  const seedCategories: Category[] = [];
  const seedBrokers: BrokerEntity[] = [];

  const amountOfCategories = 8;
  for (let i = 0; i < amountOfCategories; i++) {
    const categories: Category = {
      id: faker.string.uuid(),
      name: categoryNames[i] ?? "",
      createdById: createdById,
    };

    seedCategories.push(categories);
  }

  const addCategories = async () =>
    await prisma.category.createMany({ data: seedCategories });
  await addCategories();

  //add category config

  await prisma.categoryConfig.create({
    data: {
      id: faker.string.uuid(),
      floors: 0,
      categoryId: seedCategories[0]?.id ?? "",
      createdById: createdById,
    },
  });

  // add locations
  const amountOfLocations = 7;
  for (let i = 0; i < amountOfLocations; i++) {
    const location: Locations = {
      id: faker.string.uuid(),
      name: locationNames[i] ?? "",
      createdById: createdById,
    };

    seedLocations.push(location);
  }

  const addLocations = async () =>
    await prisma.locations.createMany({ data: seedLocations });

  await addLocations();

  // add brokers
  const amountOfBrokers = 12;
  for (let i = 0; i < amountOfBrokers; i++) {
    const broker: BrokerEntity = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      createdById: createdById,
      phoneNumber: faker.phone.number(),
    };

    seedBrokers.push(broker);
  }

  const addBrokers = async () =>
    await prisma.brokerEntity.createMany({
      data: seedBrokers,
    });

  await addBrokers();

  // add properties
  const locationIds = seedLocations.map((item) => item.id);
  const categoryId = seedCategories.map((item) => item.id);
  const brokerIds = seedBrokers.map((item) => item.id);
  const amountOfProperties = 100;
  for (let i = 0; i < amountOfProperties; i++) {
    const randLoc = Math.floor(Math.random() * seedLocations.length);
    const randCat = Math.floor(Math.random() * seedCategories.length);
    const randBroker = Math.floor(Math.random() * seedBrokers.length);
    const property: PropertyItem = {
      id: faker.string.uuid(),
      title: faker.word.words({ count: { min: 2, max: 4 } }),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      createdById: createdById,
      length: faker.number.float({ min: 10, max: 40 }),
      width: faker.number.float({ min: 20, max: 30 }),
      floors: faker.number.int({ min: 0, max: 3 }),
      priority: null,
      address: faker.location.streetAddress(),
      locationId: locationIds[randLoc] ?? "",
      categoryId: categoryId[randCat] ?? "",
      brokerEntityId: brokerIds[randBroker] ?? "",
      statusId: null,
      pricePerSqFt: faker.number.float({ min: 1000, max: 10000 }),
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

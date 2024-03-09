/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
// app/prisma/seed.ts
import {
  type Locations,
  PrismaClient,
  type PropertyItem,
  type Category,
  type BrokerEntity,
  type PropertyStatus,
  type Customer,
} from "@prisma/client";
import { fakerEN_IN as faker } from "@faker-js/faker";

const prisma = new PrismaClient();
const locationNames = [
  "Kitchlu Nagar",
  "Haibowal",
  "Mayapuri",
  "Rishi Nagar",
  "Golf Links",
  "Civil Lines",
  "Chandar Nagar",
  "Model Town",
  "Sarabha Nagar",
  "BRS Nagar",
  "Dugri",
  "Bhai Randhir Singh Nagar",
  "Pakhowal Road",
  "Ferozepur Road",
  "Dhandari Kalan",
  "Sherpur",
  "Jawahar Nagar",
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
  "Office",
  "Industrial Land",
  "Commercial Land",
  "Agricultural Land",
];

const createdById = "cltiklppw000m14b7mlse132z"; // IMPORTANT : add the user before the script runs

async function main() {
  const seedLocations: Locations[] = [];
  const seedCategories: Category[] = [];
  const seedBrokers: BrokerEntity[] = [];

  const seedStatuses = [
    "archived",
    "on_market",
    "off_market",
    "deal_in_progress",
    "done",
  ] as PropertyStatus[];

  const amountOfCategories = 12;
  for (let i = 0; i < amountOfCategories; i++) {
    const categories: Category = {
      id: faker.string.uuid(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
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
  const amountOfLocations = 17;
  for (let i = 0; i < amountOfLocations; i++) {
    const location: Locations = {
      id: faker.string.uuid(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
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
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
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
  const amountOfProperties = 1000;
  function createRandomProperty(): PropertyItem {
    const randLoc = Math.floor(Math.random() * seedLocations.length);
    const randCat = Math.floor(Math.random() * seedCategories.length);
    const randBroker = Math.floor(Math.random() * seedBrokers.length);
    const randStatus = Math.floor(Math.random() * seedStatuses.length);
    return {
      id: faker.string.uuid(),
      title: faker.word.words({ count: { min: 2, max: 4 } }),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      createdById: createdById,
      length: faker.number.float({ min: 10, max: 40 }),
      width: faker.number.float({ min: 20, max: 30 }),
      floors: faker.number.int({ min: 0, max: 3 }),
      priority: "medium",
      address: faker.location.streetAddress(),
      locationId: locationIds[randLoc] ?? "",
      categoryId: categoryId[randCat] ?? "",
      brokerEntityId: brokerIds[randBroker] ?? "",
      status: "on_market",
      pricePerSqFt: faker.number.float({ min: 1000, max: 30000 }),
    };
  }
  const seedProperties: PropertyItem[] = faker.helpers.multiple(
    createRandomProperty,
    {
      count: amountOfProperties,
    },
  );

  const addProperty = async () =>
    await prisma.propertyItem.createMany({ data: seedProperties });

  await addProperty();

  function createRandomCustomer(): Customer {
    return {
      id: faker.string.uuid(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      createdById: createdById,
      email: faker.internet.email(),
      name: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
      customerPreferenceId: null,
    };
  }
  const seedCustomers: Customer[] = faker.helpers.multiple(
    createRandomCustomer,
    {
      count: 1000,
    },
  );
  const addCustomers = async () =>
    await prisma.customer.createMany({ data: seedCustomers });

  await addCustomers();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

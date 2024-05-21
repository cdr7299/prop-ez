// app/prisma/seed.ts
/* eslint-disable */
// @ts-nocheck
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
  "Apartment",
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

const titles = {
  House: [
    "Beautiful house with great elevation and 4BHK",
    "Modern house with swimming pool and garden",
    "Luxurious house in a prime location",
  ],
  Apartment: [
    "Spacious apartment with stunning views",
    "Cozy 2BHK apartment in the city center",
    "Luxury apartment with all amenities",
  ],
  Farmhouse: [
    "Serene farmhouse with lush greenery",
    "Farmhouse with private pool and garden",
    "Rustic farmhouse perfect for weekends",
  ],
  Plot: [
    "Prime plot in a developing area",
    "Plot with great investment potential",
    "Corner plot with easy access to main road",
  ],
  Godown: [
    "Secure godown with ample storage space",
    "Godown in a prime industrial area",
    "Affordable godown with easy loading access",
  ],
  Shop: [
    "Shop in a bustling market area",
    "Prime retail space with high footfall",
    "Affordable shop in a busy locality",
  ],
  Mall: [
    "Spacious mall with top brand outlets",
    "Modern mall in a prime location",
    "Mall with excellent facilities and parking",
  ],
  Warehouse: [
    "Large warehouse with high ceilings",
    "Warehouse with 24/7 security",
    "Affordable warehouse in an industrial hub",
  ],
  Office: [
    "Office in the heart of the city",
    "Modern office with all amenities",
    "Affordable office space in a prime location",
  ],
  "Industrial Land": [
    "Industrial land with easy highway access",
    "Prime industrial land with infrastructure",
    "Affordable industrial land in a developing area",
  ],
  "Commercial Land": [
    "Commercial land in a prime business district",
    "High potential commercial land near main road",
    "Affordable commercial land with great ROI",
  ],
  "Agricultural Land": [
    "Agricultural land near highway",
    "Fertile agricultural land with water access",
    "Affordable agricultural land for farming",
  ],
};

async function seedUserIdWithFakeData(createdById: string) {
  if (!createdById) {
    console.log("No userId provided. Correct format: yarn db:seed <userId>");
    console.log("Exiting...");
    return;
  }
  const user = await prisma.user.findFirst({
    where: {
      id: createdById,
    },
  });
  if (!user) {
    console.log("User not found for id:", createdById);
    console.log("Exiting...");
    return;
  } else {
    console.log("Seeding data for user:", user);
  }
  const seedLocations: Omit<Locations, "id">[] = [];
  const seedCategories: Omit<Category, "id">[] = [];
  const seedBrokers: Omit<BrokerEntity, "id">[] = [];

  const seedStatuses = [
    "archived",
    "on_market",
    "off_market",
    "deal_in_progress",
    "done",
  ] as string[];

  const amountOfCategories = 12;
  for (let i = 0; i < amountOfCategories; i++) {
    const categories: Omit<Category, "id"> = {
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      name: categoryNames[i] ?? "",
      createdById: createdById,
    };

    seedCategories.push(categories);
  }

  const addCategories = async () =>
    await prisma.category.createManyAndReturn({ data: seedCategories });
  const createdCategories = await addCategories();
  // add locations
  const amountOfLocations = 17;
  for (let i = 0; i < amountOfLocations; i++) {
    const location: Omit<Locations, "id"> = {
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      name: locationNames[i] ?? "",
      createdById: createdById,
    };

    seedLocations.push(location);
  }

  const addLocations = async () =>
    await prisma.locations.createManyAndReturn({ data: seedLocations });

  const createdLocations = await addLocations();

  // add brokers
  const amountOfBrokers = 12;
  for (let i = 0; i < amountOfBrokers; i++) {
    const broker: Omit<BrokerEntity, "id"> = {
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      name: faker.person.fullName(),
      createdById: createdById,
      phoneNumber: faker.phone.number(),
    };

    seedBrokers.push(broker);
  }

  const addBrokers = async () =>
    await prisma.brokerEntity.createManyAndReturn({
      data: seedBrokers,
    });

  const createdBrokers = await addBrokers();

  // add properties
  const locationIds = createdLocations.map((item) => item.id);

  const categoryId = createdCategories.map((item) => item.id);
  const brokerIds = createdBrokers.map((item) => item.id);
  const amountOfProperties = 250;
  function createRandomProperty(): Omit<PropertyItem, "id"> {
    const randLocIdx = Math.floor(Math.random() * seedLocations.length);
    const randCatIdx = Math.floor(Math.random() * seedCategories.length);
    const randBroker = Math.floor(Math.random() * seedBrokers.length);
    const randStatus = Math.floor(Math.random() * seedStatuses.length);
    const randCatTitleIdx = Math.floor(Math.random() * 3);
    const catTitles = titles[createdCategories[randCatIdx].name];
    return {
      city: faker.location.city(),
      state: faker.location.state(),
      tehsil: faker.location.county(),
      title: catTitles[randCatTitleIdx],
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      createdById: createdById,
      length: faker.number.float({ min: 10, max: 40 }),
      width: faker.number.float({ min: 20, max: 30 }),
      floors: faker.number.int({ min: 0, max: 3 }),
      priority: "medium",
      address: faker.location.streetAddress(),
      locationId: locationIds[randLocIdx] ?? "",
      categoryId: categoryId[randCatIdx] ?? "",
      brokerEntityId: brokerIds[randBroker] ?? "",
      status: (seedStatuses[randStatus] as PropertyStatus) ?? "on_market",
      pricePerSqFt: faker.number.float({ min: 1000, max: 30000 }),
      priceSoldAt: null,
      askingPrice: null,
      manualPricing: false,
      sellerId: null,
    };
  }
  const seedProperties: Omit<PropertyItem, "id">[] = faker.helpers.multiple(
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
      customerType: "both",
    };
  }
  const seedCustomers: Customer[] = faker.helpers.multiple(
    createRandomCustomer,
    {
      count: 30,
    },
  );
  const addCustomers = async () =>
    await prisma.customer.createMany({ data: seedCustomers });

  await addCustomers();
}

const args = process.argv.slice(2);

seedUserIdWithFakeData(args[0] ?? "")
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });

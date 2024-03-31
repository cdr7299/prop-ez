import { createTRPCRouter } from "~/server/api/trpc";
import { propertiesRouter } from "./routers/properties";
import { locationsRouter } from "./routers/locations";
import { categoriesRouter } from "./routers/category";
import { brokersRouter } from "./routers/brokers";
import { categoriesConfigRouter } from "./routers/categoryConfigs";
import { webhooksRouter } from "./routers/webhooks";
import { customersRouter } from "./routers/customers";
import { usersRouter } from "./routers/users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  properties: propertiesRouter,
  locations: locationsRouter,
  categories: categoriesRouter,
  brokers: brokersRouter,
  categoriesConfig: categoriesConfigRouter,
  webhooks: webhooksRouter,
  customers: customersRouter,
  users: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

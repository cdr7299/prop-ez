import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { propertiesRouter } from "./routers/properties";
import { locationsRouter } from "./routers/locations";
import { categoriesRouter } from "./routers/category";
import { brokersRouter } from "./routers/brokers";
import { categoriesConfigRouter } from "./routers/categoryConfigs";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  properties: propertiesRouter,
  locations: locationsRouter,
  categories: categoriesRouter,
  brokers: brokersRouter,
  categoriesConfig: categoriesConfigRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

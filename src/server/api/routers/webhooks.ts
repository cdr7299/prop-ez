import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const webhooksRouter = createTRPCRouter({
  health: publicProcedure.query(({ input }) => {
    return {
      greeting: `Hello healthy boi`,
    };
  }),
  list: publicProcedure.query(({ ctx }) => {
    return ctx.db.propertyItem.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
});

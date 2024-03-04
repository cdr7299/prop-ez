import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const webhooksRouter = createTRPCRouter({
  health: publicProcedure.query(() => {
    return {
      greeting: `Hello healthy boi`,
    };
  }),
});

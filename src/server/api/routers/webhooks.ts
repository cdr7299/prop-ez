import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const webhooksRouter = createTRPCRouter({
  health: publicProcedure.query(({ input }) => {
    console.log(input);
    return {
      greeting: `Hello healthy boi`,
    };
  }),
  createLead: publicProcedure
    .input(
      z.object({
        testData: z.string(),
      }),
    )
    .query(({ input }) => {
      console.log(input);
      return {
        greeting: `Created Property`,
      };
    }),
});

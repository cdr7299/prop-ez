import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const categoriesConfigRouter = createTRPCRouter({
  delete: protectedProcedure
    .input(z.object({ categoryId: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      return ctx.db.categoryConfig.delete({
        where: {
          id: input.categoryId,
        },
      });
    }),
  listById: protectedProcedure
    .input(z.object({ categoryId: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.categoryConfig.findMany({
        where: {
          categoryId: input.categoryId,
        },
      });
    }),
});

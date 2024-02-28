import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const categoriesConfigRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ floors: z.number(), categoryId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const location = await ctx.db.categoryConfig.create({
        data: {
          floors: input.floors,
          categoryId: input.categoryId,
          createdById: ctx.session.user.id,
        },
      });
      return location;
    }),
  delete: protectedProcedure
    .input(z.object({ categoryId: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      return ctx.db.categoryConfig.delete({
        where: {
          id: input.categoryId,
        },
      });
    }),
  list: protectedProcedure.query(({ ctx }) => {
    return ctx.db.categoryConfig.findMany({});
  }),
});

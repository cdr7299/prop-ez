import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const categoriesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const location = await ctx.db.category.create({
        data: { name: input.name, userId: ctx.session?.user.id ?? "" },
      });
      return location;
    }),
  delete: protectedProcedure
    .input(z.object({ categoryId: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      return ctx.db.category.delete({
        where: {
          id: input.categoryId,
        },
      });
    }),
  list: protectedProcedure.query(({ ctx }) => {
    return ctx.db.category.findMany({
      where: { user: { id: ctx.session.user.id } },
    });
  }),
});

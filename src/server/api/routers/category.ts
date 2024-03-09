import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const categoriesRouter = createTRPCRouter({
  update: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        categoryId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const category = await ctx.db.category.update({
        where: {
          id: input.categoryId,
        },
        data: {
          name: input.name,
        },
      });
      return category;
    }),
  listPublic: publicProcedure.query(({ ctx }) => {
    return ctx.db.category.findMany();
  }),
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const category = await ctx.db.category.create({
        data: { name: input.name, createdById: ctx.session?.user.id ?? "" },
      });
      return category;
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
      orderBy: { name: "asc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),
});

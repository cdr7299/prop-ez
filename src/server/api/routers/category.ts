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
        fillPrice: z.boolean(),
        fillDefaultFields: z.boolean(),
        defaultFloors: z.number(),
        defaultLength: z.number(),
        defaultWidth: z.number(),
        defaultPricePerSqFt: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const category = await ctx.db.category.update({
        where: {
          id: input.categoryId,
        },
        data: {
          name: input.name,
          CategoryConfig: {
            update: {
              defaultFloors: input.defaultFloors,
              defaultLength: input.defaultLength,
              defaultPricePerSqFt: input.defaultPricePerSqFt,
              defaultWidth: input.defaultWidth,
              fillPrice: input.fillPrice,
              fillDefaultFields: input.fillDefaultFields,
            },
          },
        },
      });
      return category;
    }),
  listPublic: publicProcedure.query(({ ctx }) => {
    return ctx.db.category.findMany();
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        fillPrice: z.boolean(),
        fillDefaultFields: z.boolean(),
        defaultFloors: z.number(),
        defaultLength: z.number(),
        defaultWidth: z.number(),
        defaultPricePerSqFt: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const category = await ctx.db.category.create({
        data: {
          name: input.name,
          createdById: ctx.session?.user.id ?? "",
          CategoryConfig: {
            create: {
              defaultFloors: input.defaultFloors,
              defaultLength: input.defaultLength,
              defaultPricePerSqFt: input.defaultPricePerSqFt,
              defaultWidth: input.defaultWidth,
              fillPrice: input.fillPrice,
              fillDefaultFields: input.fillDefaultFields,
              createdById: ctx.session?.user.id ?? "",
            },
          },
        },
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
      include: { CategoryConfig: true },
    });
  }),
});

import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const propertiesRouter = createTRPCRouter({
  deleteMany: protectedProcedure
    .input(z.array(z.string()))
    .mutation(({ ctx, input }) => {
      return ctx.db.propertyItem.deleteMany({
        where: {
          id: {
            in: input,
          },
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ propertyId: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      return ctx.db.propertyItem.delete({
        where: { id: input.propertyId },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(2, {
          message: "Title must be at least 2 characters.",
        }),
        length: z.number(),
        width: z.number(),
        floors: z.number().int({ message: "Floors can be integers only" }),
        address: z.string().min(5),
        categoryId: z.string(),
        locationId: z.string(),
        brokerEntityId: z.string(),
        pricePerSqFt: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.propertyItem.create({
        data: {
          pricePerSqFt: input.pricePerSqFt,
          length: input.length,
          width: input.width,
          locationId: input.locationId,
          categoryId: input.categoryId,
          brokerEntityId: input.brokerEntityId,
          floors: input.floors,
          address: input.address,
          title: input.title,
          createdById: ctx.session.user.id,
        },
      });
    }),
  byLocationId: protectedProcedure
    .input(z.object({ locationId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.propertyItem.findMany({
        where: {
          locationId: input.locationId,
          createdBy: { id: ctx.session.user.id },
        },
      });
    }),

  list: protectedProcedure.query(({ ctx }) => {
    return ctx.db.propertyItem.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        createdBy: { id: ctx.session.user.id },
      },
    });
  }),

  avgPricePerSqFt: protectedProcedure.query(({ ctx }) => {
    return ctx.db.propertyItem.aggregate({
      _avg: { pricePerSqFt: true },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),
});

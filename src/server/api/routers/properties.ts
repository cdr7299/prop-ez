import { z } from "zod";
import { PropertyStatusZodType } from "~/app/_types/properties";

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
  update: protectedProcedure
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
        brokerEntityId: z.string().optional(),
        pricePerSqFt: z.number(),
        propertyId: z.string().min(1),
        tehsil: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        status: PropertyStatusZodType,
        askingPrice: z.number().optional(),
        manualPricing: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.propertyItem.update({
        where: { id: input.propertyId },
        data: {
          pricePerSqFt: input.pricePerSqFt,
          length: input.length,
          width: input.width,
          locationId: input.locationId,
          categoryId: input.categoryId,
          brokerEntityId:
            input.brokerEntityId === "" ? undefined : input.brokerEntityId,
          floors: input.floors,
          address: input.address,
          title: input.title,
          status: input.status,
          tehsil: input.tehsil,
          city: input.city,
          state: input.state,
          askingPrice: input.askingPrice,
          manualPricing: input.manualPricing,
        },
      });
    }),
  updateStatus: protectedProcedure
    .input(
      z.object({
        propertyId: z.string().min(1),
        status: PropertyStatusZodType,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.propertyItem.update({
        where: { id: input.propertyId },
        data: {
          status: input.status,
        },
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
        brokerEntityId: z.string().optional(),
        pricePerSqFt: z.number(),
        manualPricing: z.boolean(),
        tehsil: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        askingPrice: z.number().optional(),
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
          tehsil: input.tehsil,
          city: input.city,
          state: input.state,
          manualPricing: input.manualPricing,
          askingPrice: input.askingPrice,
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
      take: 1000,
      orderBy: { createdAt: "desc" },
      where: {
        createdBy: { id: ctx.session.user.id },
      },
    });
  }),
  listPropertyIdWithInterestedCustomers: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.propertyItem.findFirst({
        where: {
          id: input.id,
        },
        include: {
          interestedBuyers: true,
        },
      });
    }),
  avgPricePerSqFt: protectedProcedure.query(({ ctx }) => {
    return ctx.db.propertyItem.aggregate({
      _avg: { pricePerSqFt: true },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  infiniteProperties: protectedProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.string().nullish(),
        skip: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, skip, cursor } = input;
      const items = await ctx.db.propertyItem.findMany({
        take: limit + 1,
        skip: skip,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: "asc",
        },
        where: {
          createdBy: { id: ctx.session.user.id },
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop(); // return the last item from the array
        nextCursor = nextItem?.id;
      }
      return {
        items,
        nextCursor,
      };
    }),
});

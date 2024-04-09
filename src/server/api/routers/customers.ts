import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const customersRouter = createTRPCRouter({
  updateInterestedProperties: protectedProcedure
    .input(z.object({ propertyId: z.string(), customerId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.customer.update({
        where: { id: input.customerId },
        data: {
          isInterestedInBuying: {
            connect: { id: input.propertyId },
          },
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        phoneNumber: z.string().optional(),
        customerId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const customer = await ctx.db.customer.update({
        where: {
          id: input.customerId,
        },
        data: {
          name: input.name,
          phoneNumber: input.phoneNumber,
        },
      });
      return customer;
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        phoneNumber: z.string().optional(),
        email: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      const location = await ctx.db.customer.create({
        data: {
          name: input.name,
          createdById: ctx.session?.user.id ?? "",
          phoneNumber: input.phoneNumber,
          email: input.email,
        },
      });
      return location;
    }),
  deleteMany: protectedProcedure
    .input(z.array(z.string()))
    .mutation(({ ctx, input }) => {
      return ctx.db.customer.deleteMany({
        where: {
          id: {
            in: input,
          },
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ customerId: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      return ctx.db.customer.delete({
        where: {
          id: input.customerId,
        },
      });
    }),
  list: protectedProcedure.query(({ ctx }) => {
    return ctx.db.customer.findMany({
      orderBy: { name: "asc" },
      where: {
        createdBy: { id: ctx.session.user.id },
      },
    });
  }),
  listWithAllProperties: protectedProcedure.query(({ ctx }) => {
    return ctx.db.customer.findMany({
      where: { createdBy: { id: ctx.session.user.id } },
      include: {
        isSellingProperties: true,
        isInterestedInBuying: true,
      },
    });
  }),
  //very bad query
  listWithInterestedProperties: protectedProcedure.query(({ ctx }) => {
    return ctx.db.customer.findMany({
      where: { createdBy: { id: ctx.session.user.id } },
      include: {
        isInterestedInBuying: true,
      },
    });
  }),
});

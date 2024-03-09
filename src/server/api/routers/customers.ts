import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const customersRouter = createTRPCRouter({
  // update: protectedProcedure
  //   .input(
  //     z.object({
  //       name: z.string(),
  //       phoneNumber: z.string().optional(),
  //       customerId: z.string().min(1),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const customer = await ctx.db.customer.update({
  //       where: {
  //         id: input.customerId,
  //       },
  //       data: {
  //         name: input.name,
  //         phoneNumber: input.phoneNumber,
  //       },
  //     });
  //     return customer;
  //   }),
  // create: protectedProcedure
  //   .input(z.object({ name: z.string(), phoneNumber: z.string().optional() }))
  //   .mutation(async ({ ctx, input }) => {
  //     console.log(input);
  //     const location = await ctx.db.brokerEntity.create({
  //       data: {
  //         name: input.name,
  //         createdById: ctx.session?.user.id ?? "",
  //         phoneNumber: input.phoneNumber,
  //       },
  //     });
  //     return location;
  //   }),
  // deleteMany: protectedProcedure
  //   .input(z.array(z.string()))
  //   .mutation(({ ctx, input }) => {
  //     return ctx.db.brokerEntity.deleteMany({
  //       where: {
  //         id: {
  //           in: input,
  //         },
  //       },
  //     });
  //   }),
  // delete: protectedProcedure
  //   .input(z.object({ brokerId: z.string().min(1) }))
  //   .mutation(({ ctx, input }) => {
  //     return ctx.db.brokerEntity.delete({
  //       where: {
  //         id: input.brokerId,
  //       },
  //     });
  //   }),
  list: protectedProcedure.query(({ ctx }) => {
    return ctx.db.customer.findMany({
      orderBy: { name: "asc" },
      where: {
        createdBy: { id: ctx.session.user.id },
      },
    });
  }),
  listWithProperties: protectedProcedure.query(({ ctx }) => {
    return ctx.db.customer.findMany({
      where: { createdBy: { id: ctx.session.user.id } },
      include: {
        PropertyItem: true,
      },
    });
  }),
});

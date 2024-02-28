import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const brokersRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string(), phoneNumber: z.string() }))
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      const location = await ctx.db.brokerEntity.create({
        data: {
          name: input.name,
          createdById: ctx.session?.user.id ?? "",
          phoneNumber: input.phoneNumber,
        },
      });
      return location;
    }),
  delete: protectedProcedure
    .input(z.object({ locationId: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      return ctx.db.brokerEntity.delete({
        where: {
          id: input.locationId,
        },
      });
    }),
  list: protectedProcedure.query(({ ctx }) => {
    return ctx.db.brokerEntity.findMany({
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),
  listWithProperties: protectedProcedure.query(({ ctx }) => {
    return ctx.db.brokerEntity.findMany({
      where: { createdBy: { id: ctx.session.user.id } },
      include: {
        PropertyItem: true,
      },
    });
  }),
});

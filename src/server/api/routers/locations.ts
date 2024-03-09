import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const locationsRouter = createTRPCRouter({
  update: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        locationId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const category = await ctx.db.locations.update({
        where: {
          id: input.locationId,
        },
        data: {
          name: input.name,
        },
      });
      return category;
    }),
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const location = await ctx.db.locations.create({
        data: { name: input.name, createdById: ctx.session?.user.id ?? "" },
      });
      return location;
    }),
  delete: protectedProcedure
    .input(z.object({ locationId: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      return ctx.db.locations.delete({
        where: {
          id: input.locationId,
        },
      });
    }),
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.locations.findMany({
      orderBy: { name: "asc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),
  listWithProperties: protectedProcedure.query(({ ctx }) => {
    return ctx.db.locations.findMany({
      where: { createdBy: { id: ctx.session.user.id } },
      include: {
        properties: true,
      },
    });
  }),
});

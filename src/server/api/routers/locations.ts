import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const locationsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const location = await ctx.db.locations.create({
        data: { name: input.name, userId: ctx.session?.user.id ?? "" },
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
  list: protectedProcedure.query(({ ctx }) => {
    return ctx.db.locations.findMany({
      where: { user: { id: ctx.session.user.id } },
    });
  }),
});

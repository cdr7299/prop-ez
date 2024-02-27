import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const propertiesRouter = createTRPCRouter({
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
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),
});

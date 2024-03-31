import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  currentUser: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
      include: {
        UserPreference: true,
      },
    });
  }),
  updatePropertyTableColumnVisibilityById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        propertyTableColumns: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const location = await ctx.db.userPreference.update({
        data: {},
        where: {
          id: input.id,
        },
      });
      return location;
    }),
  createUserPreference: protectedProcedure
    .input(
      z.object({
        propertyTableColumns: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const location = await ctx.db.userPreference.create({
        data: {
          emailUpdates: false,
          userId: ctx.session?.user.id ?? "",
        },
      });
      return location;
    }),
});

import { type Prisma } from "@prisma/client";

export type CategoryWithConfig = Prisma.CategoryGetPayload<{
  include: { CategoryConfig: true };
}>;

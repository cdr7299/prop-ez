import { type Prisma } from "@prisma/client";

export type PropertyWithInterestedBuyers = Prisma.PropertyItemGetPayload<{
  include: { interestedBuyers: true };
}>;

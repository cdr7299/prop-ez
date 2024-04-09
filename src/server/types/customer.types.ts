import { type Prisma } from "@prisma/client";

export type CustomerWithInterestedProperties = Prisma.CustomerGetPayload<{
  include: { isInterestedInBuying: true };
}>;

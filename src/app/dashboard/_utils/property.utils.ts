import { type PropertyItem } from "@prisma/client";

export const getAddressFromProperty = (property: PropertyItem) => {
  return `${property.tehsil}, ${property.city}, ${property.state}`;
};

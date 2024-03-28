import { type PropertyItem } from "@prisma/client";

export const getPriceFromProperty = (property: PropertyItem) => {
  if (property.manualPricing) {
    return property.askingPrice;
  }
  return (
    (property.pricePerSqFt ?? 0) *
    (property.length ?? 0) *
    (property.width ?? 0)
  );
};

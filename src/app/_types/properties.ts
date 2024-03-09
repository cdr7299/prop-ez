import { z } from "zod";

// export enum PropertyStatusEnum {
//   on_market = "on_market",
//   off_market = "off_market",
//   deal_in_progress = "deal_in_progress",
//   done = "done",
//   archived = "archived",
// }

export type PropertyStatus =
  | "on_market"
  | "off_market"
  | "deal_in_progress"
  | "done"
  | "archived";

export const PropertyStatusLabels: Record<PropertyStatus, string> = {
  on_market: "On Market",
  off_market: "Off Market",
  deal_in_progress: "Deal in Progress",
  done: "Done",
  archived: "Archived",
};

export const PropertyStatusZodType = z.union([
  z.literal("on_market"),
  z.literal("off_market"),
  z.literal("deal_in_progress"),
  z.literal("done"),
  z.literal("archived"),
]);

export const PropertyStatusOptions: Array<{
  label: string;
  value: PropertyStatus;
}> = [
  {
    label: PropertyStatusLabels.on_market,
    value: "on_market",
  },
  {
    label: PropertyStatusLabels.off_market,
    value: "off_market",
  },
  {
    label: PropertyStatusLabels.deal_in_progress,
    value: "deal_in_progress",
  },
  {
    label: PropertyStatusLabels.done,
    value: "done",
  },
  {
    label: PropertyStatusLabels.archived,
    value: "archived",
  },
];

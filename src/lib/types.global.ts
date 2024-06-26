import { type RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    editBroker: (brokerId: string) => void;
    editProperty: (propertyId: string) => void;
    editCustomer: (customerId: string) => void;
  }
}

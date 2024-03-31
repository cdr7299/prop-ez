import { api } from "~/trpc/server";

export default async function Property({
  params,
}: {
  params: { propertyId: string };
}) {
  const properties = await api.properties.list.query();
  console.log("CheckedId", params);
  const selectedProperty = properties.find(
    (property) => property.id === params.propertyId,
  );
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      Property Info Page
      <div>{selectedProperty?.address}</div>
      <div>{selectedProperty?.city}</div>
      <div>{selectedProperty?.title}</div>
      <div>{selectedProperty?.status}</div>
    </div>
  );
}

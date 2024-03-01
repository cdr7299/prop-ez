import { api } from "~/trpc/server";

export async function GET() {
  const testData = await api.categories.listPublic.query();

  return Response.json({ testData });
}

import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "ccf4wg8t",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: true,
});

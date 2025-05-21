import { createClient } from "@sanity/client";

const token = import.meta.env.VITE_SANITY_TOKEN;
console.log('Environment variables available:', import.meta.env);
console.log('Token available:', !!token);
console.log('Token value:', token ? `${token.substring(0, 5)}...` : 'undefined');

export const client = createClient({
  projectId: "ccf4wg8t",
  dataset: "production",
  apiVersion: "2024-03-01",
  token: token,
  useCdn: false,
});

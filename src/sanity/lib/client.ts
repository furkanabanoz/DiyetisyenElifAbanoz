import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "rfohvqdd",
  dataset: "production",
  apiVersion: "2026-10-04",
  useCdn: true,
});
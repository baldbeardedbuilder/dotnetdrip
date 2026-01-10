import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Define drips collection with correct Content Layer API (loader without type)
const dripsCollection = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./src/content/dotnet-drips" }),
  schema: z.object({
    Subject: z.string(),
  }),
});

export const collections = {
  drips: dripsCollection,
};

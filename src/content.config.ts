import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const dripsCollection = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./src/content/dotnet-drips" }),
  schema: z.object({
    Subject: z.string(),
  }),
});

export const collections = {
  drips: dripsCollection,
};

import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const dripsCollection = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./src/content/drips" }),
  schema: z.object({
    publishDate: z.string(),
    links: z.array(
            z.object({
              title: z.string(),
              url: z.string().url(),
              summary: z.string() 
          }))
  })
});

export const collections = {
  drips: dripsCollection,
};

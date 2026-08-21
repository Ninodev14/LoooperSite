import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blockSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('text_single'),
    heading: z.string(),
    text: z.string(),
  }),
  z.object({
    type: z.literal('image_text'),
    heading: z.string(),
    image: z.string(),
    text: z.string(),
    imagePosition: z.enum(['gauche', 'droite']).default('gauche'),
  }),
  z.object({
    type: z.literal('text_two_columns'),
    heading: z.string(),
    column1: z.string(),
    column2: z.string(),
  }),
  z.object({
    type: z.literal('full_image_text'),
    heading: z.string(),
    image: z.string(),
    text: z.string(),
  }),
  z.object({
    type: z.literal('text_three_columns'),
    heading: z.string(),
    column1: z.string(),
    column2: z.string(),
    column3: z.string(),
  }),
]);

const ressources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ressources' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
    blocks: z.array(blockSchema).optional(),
  }),
});

export const collections = { ressources };

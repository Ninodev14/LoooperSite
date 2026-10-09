import { getCollection } from 'astro:content';

export async function getPublishedRessources() {
  const now = new Date();

  const articles = await getCollection('ressources', ({ data }) => {
    if (import.meta.env.DEV) return true;
    return !data.draft && data.date <= now;
  });

  return articles.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
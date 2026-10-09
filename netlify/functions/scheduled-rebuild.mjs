export default async () => {
  const url = process.env.BUILD_HOOK_URL;

  if (!url) {
    console.error('BUILD_HOOK_URL manquante');
    return;
  }

  const res = await fetch(url, { method: 'POST' });
  console.log('Rebuild déclenché, statut :', res.status);
};

export const config = {
  schedule: '0 11 * * *', // TEST : tous les jours à 11:00 UTC = 13:00 en France (heure d'été)
};
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
  schedule: '0 7 * * *', // tous les jours à 07:00 UTC (9h en été, 8h en hiver, heure de France)
};
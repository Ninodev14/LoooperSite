const HEURE_PARIS = 13; 

export default async () => {
  const heureParis = Number(
    new Intl.DateTimeFormat('fr-FR', {
      timeZone: 'Europe/Paris',
      hour: '2-digit',
      hourCycle: 'h23',
    }).format(new Date())
  );

  if (heureParis !== HEURE_PARIS) {
    console.log(`Il est ${heureParis}h à Paris, rien à faire.`);
    return;
  }

  const url = process.env.BUILD_HOOK_URL;

  if (!url) {
    console.error('BUILD_HOOK_URL manquante');
    return;
  }

  const res = await fetch(url, { method: 'POST' });
  console.log('Rebuild déclenché, statut :', res.status);
};

export const config = {
  schedule: '0 11,12 * * *',
};
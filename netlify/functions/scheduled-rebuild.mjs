const HEURE_PARIS = 14; 

function heureParis() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Paris',
    hour: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(new Date());

  return Number(parts.find((p) => p.type === 'hour').value);
}

export default async () => {
  const heure = heureParis();

  if (heure !== HEURE_PARIS) {
    console.log(`Il est ${heure}h à Paris, rien à faire.`);
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
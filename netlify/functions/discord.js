exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Méthode non autorisée" };
  }

  const payload = JSON.parse(event.body).payload;
  const data = payload.data;

  const webhookUrl = "https://discord.com/api/webhooks/1412352742088769596/pVZ586uEiVZs1fJ7rjyi6iqz-rzxGwyYeFX7M0PconGDQmMGvnaZAccgBIjZ8OJfqpq7";

  const message = {
    content: `🚀 Nouvelle demande !`,
    embeds: [
      {
        title: `${data.prenom} ${data.nom}`,
        fields: [
          { name: "Entreprise", value: data.entreprise || "Non précisé", inline: true },
          { name: "Email", value: data.email, inline: true },
          { name: "Téléphone", value: data.tel || "Non précisé", inline: true },
          { name: "Objectifs", value: (data["objectif[]"] || []).join(", ") || data.objectif_autre || "Non précisé" },
          { name: "Formats", value: (data["format[]"] || []).join(", ") || data.format_autre || "Non précisé" },
          { name: "Message", value: data.message }
        ],
        color: 5814783
      }
    ]
  };

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message)
  });

  return { statusCode: 200, body: "Sent to Discord!" };
};

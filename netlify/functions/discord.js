const qs = require("querystring");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Méthode non autorisée" };
  }

  const data = qs.parse(event.body);

  const message = {
    content: "🚀 Nouvelle demande !",
    embeds: [
      {
        title: `${data.prenom} ${data.nom}`,
        fields: [
          { name: "Entreprise", value: data.entreprise || "Non précisé", inline: true },
          { name: "Email", value: data.email, inline: true },
          { name: "Téléphone", value: data.tel || "Non précisé", inline: true },
          { name: "Objectifs", value: [].concat(data["objectif[]"] || []).join(", ") || data.objectif_autre || "Non précisé" },
          { name: "Message", value: data.message }
        ]
      }
    ]
  };

  await fetch("https://discord.com/api/webhooks/1412352742088769596/pVZ586uEiVZs1fJ7rjyi6iqz-rzxGwyYeFX7M0PconGDQmMGvnaZAccgBIjZ8OJfqpq7", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message)
  });

  return { statusCode: 200, body: "Sent to Discord!" };
};

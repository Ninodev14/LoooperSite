const querystring = require("querystring");

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Méthode non autorisée" };
    }

    console.log(event.body);

    const data = querystring.parse(event.body);

    const objectifs = []
        .concat(data["objectif[]"] || [])
        .concat(data.objectif_autre || [])
        .filter(Boolean)
        .join(", ") || "Non précisé";

    const formats = []
        .concat(data["format[]"] || [])
        .concat(data.format_autre || [])
        .filter(Boolean)
        .join(", ") || "Non précisé";

    const message = {
        content: "🚀 Nouvelle demande !",
        embeds: [
            {
                title: `${data.prenom || ""} ${data.nom || ""}`,
                fields: [
                    { name: "Entreprise", value: data.entreprise || "Non précisé", inline: true },
                    { name: "Statut", value: data.statut || "Non précisé", inline: true },
                    { name: "Email", value: data.email || "Non précisé", inline: true },
                    { name: "Téléphone", value: data.tel || "Non précisé", inline: true },
                    { name: "Objectifs", value: objectifs },
                    { name: "Formats", value: formats },
                    { name: "Message", value: data.message || "Aucun" }
                ],
                color: 5814783
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
exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Méthode non autorisée" };
    }
    console.log(event.body);
    const body = JSON.parse(event.body);
    const humanFields = body.human_fields || {};


    const objectifs = []
        .concat(body.data?.["objectif[]"] || [])
        .concat(body.data?.objectif_autre || [])
        .filter(Boolean)
        .join(", ") || "Non précisé";

    const formats = []
        .concat(body.data?.["format[]"] || [])
        .concat(body.data?.format_autre || [])
        .filter(Boolean)
        .join(", ") || "Non précisé";

    const message = {
        content: "🚀 Nouvelle demande !",
        embeds: [
            {
                title: `${humanFields["Prénom"] || ""} ${humanFields["Nom"] || ""}`,
                fields: [
                    { name: "entreprise", value: humanFields["entreprise"] || "Non précisé", inline: true },
                    { name: "Statut", value: humanFields["Statut"] || "Non précisé", inline: true },
                    { name: "Email", value: humanFields["Email"] || "Non précisé", inline: true },
                    { name: "Téléphone", value: humanFields["Téléphone"] || "Non précisé", inline: true },
                    { name: "Objectifs", value: objectifs },
                    { name: "Formats", value: formats },
                    { name: "Message", value: humanFields["Message"] || "Aucun" }
                ],
                color: 5814783
            }
        ]
    };
 
    await fetch("https://discord.com/api/webhooks/1412352742088769596/pVZ586uEiVZs1fJ7rjyi6iqz-rzxGwyYeFX7M0PconGDQmMGvnaZAccgBIjZ8OJfqpq7",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(message)
        }
    );

    return { statusCode: 200, body: "Sent to Discord!" };
};


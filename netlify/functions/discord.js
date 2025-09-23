exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Méthode non autorisée" };
    }
    console.log(event.body);
    const body = JSON.parse(event.body);
    const humanFields = body.human_fields || {};

    const message = {
        content: "🚀 Nouvelle demande !",
        embeds: [
            {
                title: `${humanFields["prenom"] || ""} ${humanFields["nom"] || ""}`,
                fields: [
                    { name: "Entreprise", value: humanFields["entreprise"] || "Non précisé", inline: true },
                    { name: "Statut", value: humanFields["statut"] || "Non précisé", inline: true },
                    { name: "Email", value: humanFields["email"] || "Non précisé", inline: true },
                    { name: "Téléphone", value: humanFields["telephone"] || "Non précisé", inline: true },
                    { name: "Message", value: humanFields["message"] || "Aucun" }
                ],
                color: 5814783
            }
        ]
    }


    await fetch("https://discord.com/api/webhooks/1412352742088769596/pVZ586uEiVZs1fJ7rjyi6iqz-rzxGwyYeFX7M0PconGDQmMGvnaZAccgBIjZ8OJfqpq7",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(message)
        }
    );

    return { statusCode: 200, body: "Sent to Discord!" };
};


exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Méthode non autorisée" };
    }

    const body = JSON.parse(event.body);
    const fields = body.human_fields || {};

    const message = {
        content: "🚀 Nouvelle demande !",
        embeds: [
            {
                title: `${fields["Prénom"] || ""} ${fields["Nom"] || ""}`,
                fields: [
                    { name: "Entreprise", value: fields["Entreprise"] || "Non précisé", inline: true },
                    { name: "Statut", value: fields["Statut"] || "Non précisé", inline: true },
                    { name: "Email", value: fields["Email"] || "Non précisé", inline: true },
                    { name: "Téléphone", value: fields["Téléphone"] || "Non précisé", inline: true },

                    { name: "Message", value: fields["Message"] || "Aucun" }
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


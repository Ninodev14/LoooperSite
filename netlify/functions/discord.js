exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Méthode non autorisée" };
    }

    const params = new URLSearchParams(event.body);
    const fields = Object.fromEntries(params);

    const message = {
        content: "🚀 Nouvelle demande !",
        embeds: [
            {
                title: `${fields.prenom || ""} ${fields.nom || ""}`,
                fields: [
                    { name: "Entreprise", value: fields.entreprise || "Non précisé", inline: true },
                    { name: "Statut", value: fields.statut || "Non précisé", inline: true },
                    { name: "Email", value: fields.email || "Non précisé", inline: true },
                    { name: "Téléphone", value: fields.telephone || "Non précisé", inline: true },
                    { name: "Message", value: fields.message || "Aucun" }
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


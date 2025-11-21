document.getElementById("objectif_autre_checkbox").addEventListener("change", function () {
    const input = document.getElementById("objectif_autre_text");
    input.style.display = this.checked ? "block" : "none";
    if (!this.checked) input.value = "";
});

document.getElementById("format_autre_checkbox").addEventListener("change", function () {
    const input = document.getElementById("format_autre_text");
    input.style.display = this.checked ? "block" : "none";
    if (!this.checked) input.value = "";
});


let preventClose = false;

document.querySelectorAll('.contact .dropdown').forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const content = dropdown.querySelector('.dropdown-content');
    const checkboxes = content.querySelectorAll('input[type="checkbox"]');

    toggle.addEventListener('click', e => {
        e.stopPropagation();

        dropdown.classList.toggle('open');

        document.querySelectorAll('.contact .dropdown').forEach(other => {
            if (other !== dropdown) other.classList.remove('open');
        });
    });


    const updateSummary = () => {
        const count = [...checkboxes].filter(c => c.checked).length;
        toggle.style.color = count > 0 ? "#000" : "#8D8D8D";
        toggle.textContent = count > 0
            ? `${count} sélectionné${count > 1 ? 's' : ''}`
            : "Aucun sélectionné";
    };

    checkboxes.forEach(cb => cb.addEventListener("change", updateSummary));
    updateSummary();
});

document.addEventListener('click', e => {
    if (preventClose) {
        preventClose = false;
        return;
    }

    document.querySelectorAll('.contact .dropdown').forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });
});


document.querySelectorAll('a[href="#contactForm"][data-format]').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();

        preventClose = true;

        const formatValue = btn.getAttribute("data-format");

        const form = document.querySelector('#contactForm');
        if (form) form.scrollIntoView({ behavior: 'smooth' });

        const checkbox = document.querySelector(`input[name="format[]"][value="${formatValue}"]`);
        if (checkbox) {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event("change"));
        }

        const dropdown = checkbox.closest('.dropdown');
        dropdown.classList.add("open");

        const toggle = dropdown.querySelector('.dropdown-toggle');
        const checkedCount = dropdown.querySelectorAll('input[type="checkbox"]:checked').length;
        toggle.textContent = `${checkedCount} sélectionné${checkedCount > 1 ? 's' : ''}`;
        toggle.style.color = "#000";
    });
});


document.querySelectorAll('a[href="#contactForm"]:not([data-format])').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector('#contactForm')?.scrollIntoView({ behavior: 'smooth' });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('form[name="contactformV4"]');
    const button = form.querySelector('button[type="submit"]');
    const animationDiv = document.getElementById("animation");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        button.classList.add("btn-hidden");

        const formData = new FormData(form);

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
        .then(() => {
            const webhookURL = "https://discord.com/api/webhooks/1412352742088769596/pVZ586uEiVZs1fJ7rjyi6iqz-rzxGwyYeFX7M0PconGDQmMGvnaZAccgBIjZ8OJfqpq7";

            const message = {
                content: "**📩 Nouveau message reçu via le formulaire :**",
                embeds: [
                    {
                        title: "Nouveau contact",
                        color: 5814783,
                        fields: [
                            { name: "Nom", value: formData.get("nom") || "—" },
                            { name: "Prénom", value: formData.get("prenom") || "—" },
                            { name: "Email", value: formData.get("email") || "—" },
                            { name: "Téléphone", value: formData.get("telephone") || "—" },
                            { name: "Entreprise", value: formData.get("entreprise") || "—" },
                            { name: "Statut", value: formData.get("statut") || "—" },
                            { name: "Objectifs", value: formData.getAll("objectif[]").join(", ") || "—" },
                            { name: "Autre objectif", value: formData.get("objectif_autre") || "—" },
                            { name: "Format", value: formData.getAll("format[]").join(", ") || "—" },
                            { name: "Autre format", value: formData.get("format_autre") || "—" },
                            { name: "Message", value: formData.get("message") || "—" }
                        ]
                    }
                ]
            };

            fetch(webhookURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(message)
            });

            animationDiv.classList.add("show-animation");
            form.reset();
        })
        .catch((error) => {
            console.error("Erreur d’envoi :", error);
            alert("Une erreur est survenue.");
        });
    });
});

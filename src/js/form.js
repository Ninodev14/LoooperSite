const form = document.getElementById('contactForm');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = new FormData(form);

    fetch('/', { method: 'POST', body: data })
        .then(() => {
            form.style.display = 'none';
            document.getElementById('animation').style.display = 'block';
        })
        .catch(err => alert('Erreur : ' + err));
});

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
document.querySelectorAll('.contact .dropdown').forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const content = dropdown.querySelector('.dropdown-content');
    const checkboxes = content.querySelectorAll('input[type="checkbox"]');

    toggle.addEventListener('click', (e) => {
        e.stopPropagation(); 
        const isOpen = dropdown.classList.toggle('open');
        dropdown.closest('.contact').querySelectorAll('.dropdown').forEach(other => {
            if (other !== dropdown) other.classList.remove('open');
        });
    });

    document.addEventListener('click', e => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });

    const updateSummary = () => {
        const checkedCount = [...checkboxes].filter(c => c.checked).length;
        toggle.textContent = checkedCount > 0
            ? `${checkedCount} sélectionné${checkedCount > 1 ? 's' : ''}`
            : 'Aucun sélectionné';
    };

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSummary);
    });

    updateSummary(); 
});

const contact = document.querySelector('.contact');
if (contact) {
    const objectifAutre = contact.querySelector('#objectif_autre_checkbox');
    const objectifTexte = contact.querySelector('#objectif_autre_text');
    const formatAutre = contact.querySelector('#format_autre_checkbox');
    const formatTexte = contact.querySelector('#format_autre_text');

    if (objectifAutre && objectifTexte) {
        objectifAutre.addEventListener('change', () => {
            objectifTexte.style.display = objectifAutre.checked ? 'block' : 'none';
        });
    }

    if (formatAutre && formatTexte) {
        formatAutre.addEventListener('change', () => {
            formatTexte.style.display = formatAutre.checked ? 'block' : 'none';
        });
    }
}

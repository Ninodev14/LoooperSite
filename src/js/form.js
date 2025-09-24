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

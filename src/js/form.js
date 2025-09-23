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


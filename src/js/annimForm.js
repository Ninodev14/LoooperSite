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

const autreCheckbox = document.getElementById('objectif-autre-checkbox');
const autreInput = document.getElementById('objectif-autre-input');

autreCheckbox.addEventListener('change', () => {
    if (autreCheckbox.checked) {
        autreInput.style.display = 'block';
    } else {
        autreInput.style.display = 'none';
        autreInput.value = '';
    }
});

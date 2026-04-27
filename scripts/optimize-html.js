const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ROOT_DIR = './'; // Puisque ton build Netlify publie à la racine

function optimizeHTML() {
    // On récupère tous les fichiers HTML à la racine
    const files = fs.readdirSync(ROOT_DIR).filter(f => f.endsWith('.html'));

    files.forEach(file => {
        const filePath = path.join(ROOT_DIR, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const document = dom.window.document;
        const images = document.querySelectorAll('img');
        let hasChanged = false;

        images.forEach(img => {
            const src = img.getAttribute('src');

            // On ne transforme que si c'est une image locale JPG/PNG et pas déjà dans un <picture>
            if (src && /\.(png|jpe?g)$/i.test(src) && img.parentElement.tagName !== 'PICTURE') {
                
                const webpSrc = src.replace(/\.(png|jpe?g)$/i, '.webp');

                // Création de l'élément <picture>
                const picture = document.createElement('picture');
                
                // Source WebP
                const source = document.createElement('source');
                source.setAttribute('srcset', webpSrc);
                source.setAttribute('type', 'image/webp');

                // Image originale (fallback) + Lazy loading
                const newImg = img.cloneNode(true);
                if (!newImg.hasAttribute('loading')) {
                    newImg.setAttribute('loading', 'lazy');
                }

                picture.appendChild(source);
                picture.appendChild(newImg);

                // Remplacement
                img.parentNode.replaceChild(picture, img);
                hasChanged = true;
            }
        });

        if (hasChanged) {
            fs.writeFileSync(filePath, dom.serialize(), 'utf8');
            console.log(`✨ HTML Optimisé : ${file}`);
        }
    });
}

console.log("🔍 Analyse et optimisation du HTML...");
optimizeHTML();
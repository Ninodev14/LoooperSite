const fs = require('fs');
const path = require('path');

// Dossiers pour lesquels générer des srcset
const RESPONSIVE_DIRS = ['carousel'];
const RESPONSIVE_SIZES = [400, 800];

function addSrcset(html) {
    // Regex qui matche les <img src="...carousel/xxx.(jpg|jpeg|png|webp)"...>
    return html.replace(
        /<img([^>]*?)src="([^"]*\/carousel\/([^"]+)\.(jpg|jpeg|png|webp))"([^>]*?)>/g,
        (match, before, src, basename, ext, after) => {
            // Ne pas traiter si srcset déjà présent
            if (match.includes('srcset=')) return match;

            const dir = src.replace(`${basename}.${ext}`, '');
            // Toujours pointer vers le webp final (généré par build:images)
            const srcWebp = `${dir}${basename}.webp`;

            const srcset = RESPONSIVE_SIZES
                .map(w => `${dir}${basename}-${w}w.webp ${w}w`)
                .concat(`${srcWebp} 1002w`)
                .join(', ');

            const sizes = '(max-width: 480px) 400px, (max-width: 900px) 800px, 1002px';

            return `<img${before}src="${srcWebp}" srcset="${srcset}" sizes="${sizes}"${after}>`;
        }
    );
}

function find(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory() && f !== 'node_modules' && f !== '.git') {
            find(p);
        } else if (f.endsWith('.html')) {
            const original = fs.readFileSync(p, 'utf8');
            const updated = addSrcset(original);
            if (original !== updated) {
                fs.writeFileSync(p, updated);
                console.log(`✅ srcset ajouté : ${p}`);
            }
        }
    });
}

console.log('🚀 Ajout des srcset sur les images responsives...');
find('.');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'src/img';

// Dossiers qui nécessitent des versions responsives (images trop grandes)
const RESPONSIVE_DIRS = ['carousel'];

// Tailles à générer pour les images responsives
const RESPONSIVE_SIZES = [400, 800];

function walk(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            walk(filePath);
        } else if (/\.(png|jpe?g)$/i.test(file)) {
            const outputRef = filePath.replace(/\.(png|jpe?g)$/i, '.webp');
            const dirName = path.basename(path.dirname(filePath));
            const isResponsive = RESPONSIVE_DIRS.includes(dirName);

            // Conversion WebP standard
            sharp(filePath)
                .webp({ quality: 80 })
                .toFile(outputRef)
                .then(() => console.log(`✅ WebP créé : ${outputRef}`))
                .catch(err => console.error(`❌ Erreur sur ${file}:`, err));

            // Génération des versions responsives si nécessaire
            if (isResponsive) {
                RESPONSIVE_SIZES.forEach(width => {
                    const baseName = path.basename(file, path.extname(file));
                    const outputResized = path.join(
                        path.dirname(filePath),
                        `${baseName}-${width}w.webp`
                    );
                    sharp(filePath)
                        .resize(width)
                        .webp({ quality: 80 })
                        .toFile(outputResized)
                        .then(() => console.log(`✅ Redimensionné ${width}px : ${outputResized}`))
                        .catch(err => console.error(`❌ Erreur resize ${width}px sur ${file}:`, err));
                });
            }
        }
    });
}

console.log("🚀 Conversion et redimensionnement des images...");
walk(inputDir);
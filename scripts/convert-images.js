const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'src/img'; 

function walk(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            walk(filePath);
        } else if (/\.(png|jpe?g)$/i.test(file)) {
            const outputRef = filePath.replace(/\.(png|jpe?g)$/i, '.webp');
            
            sharp(filePath)
                .webp({ quality: 80 })
                .toFile(outputRef)
                .then(() => console.log(`✅ WebP créé : ${outputRef}`))
                .catch(err => console.error(`❌ Erreur sur ${file}:`, err));
        }
    });
}

console.log("🚀 Conversion des images en WebP...");
walk(inputDir);
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import generateSitemap from '../src/lib/sitemap.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sitemap = generateSitemap();
const outputPath = path.join(__dirname, '../public/sitemap.xml');

fs.writeFileSync(outputPath, sitemap);
console.log('Sitemap generated successfully at:', outputPath); 
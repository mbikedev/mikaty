import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateOGImage = async () => {
  try {
    // Create a new image with the recommended dimensions
    const width = 1200;
    const height = 630;

    // Create a more sophisticated gradient background
    const svgBackground = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1E40AF;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#3B82F6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#60A5FA;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
        <circle cx="600" cy="315" r="250" fill="white" fill-opacity="0.1"/>
        <circle cx="600" cy="315" r="200" fill="white" fill-opacity="0.05"/>
      </svg>
    `;

    // Create the base image with gradient
    const baseImage = await sharp(Buffer.from(svgBackground))
      .resize(width, height)
      .png()
      .toBuffer();

    // Add the logo
    const logo = await sharp(path.join(__dirname, '../public/mikaty-logo-alt.svg'))
      .resize(300, 300)
      .png()
      .toBuffer();

    // Create text overlay for the tagline
    const textSvg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <style>
          .title { fill: white; font-family: Arial, sans-serif; font-weight: bold; }
          .subtitle { fill: rgba(255, 255, 255, 0.9); font-family: Arial, sans-serif; }
        </style>
        <text x="600" y="200" text-anchor="middle" class="title" font-size="48">MIKATY</text>
        <text x="600" y="260" text-anchor="middle" class="subtitle" font-size="32">All-in-one Finance App</text>
        <text x="600" y="500" text-anchor="middle" class="subtitle" font-size="24">Your Money, Your Way</text>
      </svg>
    `;

    const textOverlay = await sharp(Buffer.from(textSvg))
      .resize(width, height)
      .png()
      .toBuffer();

    // Composite all layers
    const finalImage = await sharp(baseImage)
      .composite([
        {
          input: logo,
          gravity: 'center',
          blend: 'over'
        },
        {
          input: textOverlay,
          gravity: 'center',
          blend: 'over'
        }
      ])
      .jpeg({
        quality: 90,
        progressive: true,
        chromaSubsampling: '4:4:4'
      })
      .toBuffer();

    // Save the final image
    const outputPath = path.join(__dirname, '../public/mikaty-og-image.jpg');
    await sharp(finalImage).toFile(outputPath);

    console.log('Open Graph image generated successfully at:', outputPath);
  } catch (error) {
    console.error('Error generating Open Graph image:', error);
  }
};

generateOGImage(); 
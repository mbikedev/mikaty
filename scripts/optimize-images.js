import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const optimizeImage = async (inputPath, outputPath, options = {}) => {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Determine output format based on input
    const format = options.format || metadata.format;

    // Set optimization options based on format
    const optimizationOptions = {
      jpeg: {
        quality: 80,
        progressive: true,
        chromaSubsampling: '4:4:4',
      },
      png: {
        quality: 80,
        compressionLevel: 9,
      },
      webp: {
        quality: 80,
        lossless: false,
      },
    };

    // Apply format-specific optimizations
    if (format === 'jpeg' || format === 'jpg') {
      await image.jpeg(optimizationOptions.jpeg);
    } else if (format === 'png') {
      await image.png(optimizationOptions.png);
    } else if (format === 'webp') {
      await image.webp(optimizationOptions.webp);
    }

    // Resize if dimensions are provided
    if (options.width || options.height) {
      await image.resize(options.width, options.height, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    // Create a temporary file for the output
    const tempOutputPath = outputPath + '.temp';
    await image.toFile(tempOutputPath);

    // Replace the original file with the optimized one
    fs.unlinkSync(inputPath);
    fs.renameSync(tempOutputPath, outputPath);

    console.log(`Optimized: ${inputPath} -> ${outputPath}`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error);
  }
};

const processDirectory = async (directory) => {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await processDirectory(filePath);
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
      await optimizeImage(filePath, filePath);
    }
  }
};

// Process images in the assets directory
const assetsDir = path.join(__dirname, '../src/assets');
processDirectory(assetsDir)
  .then(() => console.log('Image optimization complete!'))
  .catch(console.error); 
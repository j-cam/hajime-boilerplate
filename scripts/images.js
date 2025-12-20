import { readdir, copyFile, mkdir } from 'fs/promises';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function copyImages() {
  try {
    const srcDir = resolve(__dirname, '../src/media/img');
    const destDir = resolve(__dirname, '../docs/assets/img');

    // Ensure destination directory exists
    if (!existsSync(destDir)) {
      await mkdir(destDir, { recursive: true });
    }

    // Check if source directory exists
    if (!existsSync(srcDir)) {
      console.log('ℹ No image source directory found');
      return;
    }

    const files = await readdir(srcDir);
    const imageFiles = files.filter(file =>
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file),
    );

    if (imageFiles.length === 0) {
      console.log('ℹ No image files found');
      return;
    }

    for (const file of imageFiles) {
      await copyFile(join(srcDir, file), join(destDir, file));
    }

    console.log(`✓ Copied ${imageFiles.length} images`);
  } catch (error) {
    console.error('✗ Image copy failed:', error);
    process.exit(1);
  }
}

copyImages();

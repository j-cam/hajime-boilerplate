import { optimize } from 'svgo';
import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { resolve, dirname, basename, join } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function optimizeSVGs() {
  try {
    const srcDir = resolve(__dirname, '../src/media/svg');
    const destDir = resolve(__dirname, '../docs/assets/img');

    // Ensure destination directory exists
    if (!existsSync(destDir)) {
      await mkdir(destDir, { recursive: true });
    }

    // Check if source directory exists
    if (!existsSync(srcDir)) {
      console.log('ℹ No SVG source directory found');
      return;
    }

    const files = await readdir(srcDir);
    const svgFiles = files.filter(file => file.endsWith('.svg'));

    if (svgFiles.length === 0) {
      console.log('ℹ No SVG files found');
      return;
    }

    for (const file of svgFiles) {
      const content = await readFile(join(srcDir, file), 'utf-8');
      const result = optimize(content, {
        path: join(srcDir, file),
        multipass: true,
      });

      await writeFile(join(destDir, file), result.data);
    }

    console.log(`✓ Optimized ${svgFiles.length} SVG files`);
  } catch (error) {
    console.error('✗ SVG optimization failed:', error);
    process.exit(1);
  }
}

optimizeSVGs();

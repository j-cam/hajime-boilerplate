import { optimize } from 'svgo';
import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { resolve, dirname, basename, join } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function buildSVGSprite() {
  try {
    const srcDir = resolve(__dirname, '../src/media/sprite-svg');
    const destDir = resolve(__dirname, '../docs/assets/img');

    // Ensure destination directory exists
    if (!existsSync(destDir)) {
      await mkdir(destDir, { recursive: true });
    }

    // Check if source directory exists
    if (!existsSync(srcDir)) {
      console.log('ℹ No SVG sprite source directory found');
      return;
    }

    const files = await readdir(srcDir);
    const svgFiles = files.filter(file => file.endsWith('.svg'));

    if (svgFiles.length === 0) {
      console.log('ℹ No SVG files found for sprite');
      return;
    }

    let symbols = '';

    for (const file of svgFiles) {
      const content = await readFile(join(srcDir, file), 'utf-8');
      const result = optimize(content, {
        path: join(srcDir, file),
        multipass: true,
        plugins: [
          {
            name: 'removeAttrs',
            params: {
              attrs: '(fill|stroke)',
            },
          },
        ],
      });

      const id = basename(file, '.svg');
      const svgContent = result.data.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '');
      symbols += `  <symbol id="${id}">${svgContent}</symbol>\n`;
    }

    const sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none;">\n${symbols}</svg>`;

    await writeFile(join(destDir, 'sprite.svg'), sprite);
    console.log(`✓ Created SVG sprite with ${svgFiles.length} symbols`);
  } catch (error) {
    console.error('✗ SVG sprite generation failed:', error);
    process.exit(1);
  }
}

buildSVGSprite();

import { build } from 'esbuild';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function buildJS() {
  try {
    // Read the main.js file to resolve includes
    const mainJsContent = readFileSync(
      resolve(__dirname, '../src/js/main.js'),
      'utf-8',
    );

    // Extract include statements
    const includePattern = /\/\/=include\s+(.+)/g;
    const includes = [];
    let match;

    while ((match = includePattern.exec(mainJsContent)) !== null) {
      includes.push(resolve(__dirname, '../src/js', match[1].trim()));
    }

    await build({
      entryPoints: [resolve(__dirname, '../src/js/main.js')],
      bundle: true,
      minify: true,
      sourcemap: true,
      outfile: resolve(__dirname, '../docs/assets/js/main.js'),
      target: ['es2020'],
      format: 'iife',
    });

    console.log('✓ JavaScript built successfully');
  } catch (error) {
    console.error('✗ JavaScript build failed:', error);
    process.exit(1);
  }
}

buildJS();

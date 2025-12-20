import Handlebars from 'handlebars';
import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { resolve, dirname, join, parse, relative } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Register custom helpers
Handlebars.registerHelper('raw', function(options) {
  return options.fn();
});

async function loadPartials(partialsDir) {
  if (!existsSync(partialsDir)) return;

  const files = await readdir(partialsDir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = join(partialsDir, file.name);

    if (file.isDirectory()) {
      await loadPartials(fullPath);
    } else if (file.name.endsWith('.html')) {
      const content = await readFile(fullPath, 'utf-8');
      const partialName = relative(partialsDir, fullPath)
        .replace(/\\/g, '/')
        .replace(/\.html$/, '');
      Handlebars.registerPartial(partialName, content);
    }
  }
}

async function buildTemplates() {
  try {
    const pagesDir = resolve(__dirname, '../src/templates/pages');
    const layoutsDir = resolve(__dirname, '../src/templates/layouts');
    const partialsDir = resolve(__dirname, '../src/templates/partials');
    const destDir = resolve(__dirname, '../docs');

    // Ensure destination directory exists
    if (!existsSync(destDir)) {
      await mkdir(destDir, { recursive: true });
    }

    // Load partials
    if (existsSync(partialsDir)) {
      await loadPartials(partialsDir);
    }

    // Load layout
    let layoutTemplate = null;
    const defaultLayoutPath = join(layoutsDir, 'default.html');
    if (existsSync(defaultLayoutPath)) {
      const layoutContent = await readFile(defaultLayoutPath, 'utf-8');
      layoutTemplate = Handlebars.compile(layoutContent);
    }

    // Process pages
    if (!existsSync(pagesDir)) {
      console.log('ℹ No pages directory found');
      return;
    }

    const files = await readdir(pagesDir);
    const htmlFiles = files.filter(file => file.endsWith('.html'));

    if (htmlFiles.length === 0) {
      console.log('ℹ No HTML pages found');
      return;
    }

    for (const file of htmlFiles) {
      const content = await readFile(join(pagesDir, file), 'utf-8');
      const pageTemplate = Handlebars.compile(content);
      const pageHtml = pageTemplate({});

      let output;
      if (layoutTemplate) {
        output = layoutTemplate({ body: pageHtml });
      } else {
        output = pageHtml;
      }

      await writeFile(join(destDir, file), output);
    }

    console.log(`✓ Built ${htmlFiles.length} HTML pages`);
  } catch (error) {
    console.error('✗ Template build failed:', error);
    process.exit(1);
  }
}

buildTemplates();

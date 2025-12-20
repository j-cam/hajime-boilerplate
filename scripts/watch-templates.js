import chokidar from 'chokidar';
import { exec } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const watcher = chokidar.watch([
  resolve(__dirname, '../src/templates/**/*.html'),
], {
  persistent: true,
  ignoreInitial: true,
});

console.log('👀 Watching template files for changes...');

watcher.on('change', (path) => {
  console.log(`\n📝 ${path} changed, rebuilding...`);
  exec('npm run templates', (error, stdout, stderr) => {
    if (error) {
      console.error(stderr);
    } else {
      console.log(stdout);
    }
  });
});

import fs from 'node:fs';
import path from 'node:path';

const targets = [
  path.resolve(process.cwd(), 'public', 'r'),
  path.resolve(process.cwd(), 'server', 'r', 'pro'),
];

for (const dir of targets) {
  fs.rmSync(dir, { recursive: true, force: true });
}


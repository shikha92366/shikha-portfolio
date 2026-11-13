import fs from 'node:fs';
const id = process.argv[2];
if (!id || !/^[a-z0-9]+$/.test(id)) throw new Error('Usage: npm run configure:csp -- YOUR_SANITY_PROJECT_ID');
const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
for (const group of config.headers) for (const header of group.headers) {
  if (header.key === 'Content-Security-Policy') header.value = header.value.replace(/connect-src[^;]*;/, `connect-src 'self' https://${id}.apicdn.sanity.io https://${id}.api.sanity.io;`);
}
fs.writeFileSync('vercel.json', JSON.stringify(config, null, 2) + '\n');
console.log('CSP configured for the supplied Sanity project. Commit vercel.json before deployment.');

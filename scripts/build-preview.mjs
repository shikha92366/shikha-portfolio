/* Build a self-contained, offline preview. Run after npm run build. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import vm from 'node:vm';
import * as esbuild from 'esbuild';
const root = path.resolve(__dirname, '..');
const assets = {};
const mime = {png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',webp:'image/webp',svg:'image/svg+xml',pdf:'application/pdf',csv:'text/csv',ico:'image/x-icon'};
(async () => {
 const result = await esbuild.build({absWorkingDir:root,entryPoints:['src/main.tsx'],bundle:true,write:false,format:'iife',minify:true,define:{'process.env.NODE_ENV':'"production"','import.meta.env':'{}'},plugins:[{name:'offline-preview',setup(build){
 build.onLoad({filter:/\.css$/},()=>({contents:'',loader:'js'}));
 build.onLoad({filter:/\.[jt]sx?$/},args=>{
 if(!args.path.startsWith(path.join(root,'src'))) return;
 let source=fs.readFileSync(args.path,'utf8');
 if(args.path.endsWith('/App.tsx')) source=source.replace('BrowserRouter, Routes','HashRouter as BrowserRouter, Routes');
 source=source.replace(/(['"])(\/[^'"\n]+\.(?:png|jpg|jpeg|webp|svg|pdf|csv|ico))\1/g,(match,quote,url)=>{
 const file=path.join(root,'public',url); if(!fs.existsSync(file)) return match;
 assets[url]='data:'+mime[url.split('.').pop()]+';base64,'+fs.readFileSync(file).toString('base64');
 return '__PREVIEW_ASSETS__['+JSON.stringify(url)+']';
 });
 return {contents:source,loader:args.path.endsWith('tsx')?'tsx':args.path.endsWith('ts')?'ts':'jsx'};
 });
 }}]});
 const js=result.outputFiles.find(f=>f.path.endsWith('.js'))?.text || result.outputFiles[0].text;
 const code='const __PREVIEW_ASSETS__='+JSON.stringify(assets).replace(/</g,'\\u003c')+';'+js;
 new vm.Script(code);
 const css=fs.readdirSync(path.join(root,'dist/assets')).filter(f=>f.endsWith('.css')).map(f=>fs.readFileSync(path.join(root,'dist/assets',f),'utf8')).join('\n');
 const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Shikha | Portfolio preview</title><style>'+css+'</style></head><body><div id="root"></div><script>'+code.replace(/<\/script/gi,'<\\/script')+'</script></body></html>';
 const output=path.resolve(process.argv[2]||path.join(root,'Open_My_Portfolio.html'));
 fs.writeFileSync(output,html); console.log('Created '+output+' ('+Object.keys(assets).length+' embedded assets)');
})().catch(e=>{console.error(e);process.exitCode=1;});

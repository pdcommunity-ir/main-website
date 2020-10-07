import { clientCompiler } from "./compiler.mjs";
import fs from "fs";
import { buildFolder, rootFolder } from "../paths.mjs";
import { promisify } from "util";
import path from "path";
import { buildData } from "../build/buildData.mjs";
import fsEx from "fs-extra";

const rmdir = promisify(fs.rmdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const main = async () => {
  await rmdir(buildFolder, { recursive: true });
  let started = false;
  clientCompiler.watch({}, async (err, stats) => {
    if (err || stats.hasErrors()) {
      if (err) {
        console.error(err);
      } else {
        console.error(stats.toString({ colors: true }));
      }
      console.log('Failed at ' + (new Date));
      return;
    }
    const wa = JSON.parse((
      await readFile(path.join(rootFolder, 'babeloutput', 'webpack-assets.json'))
    ).toString());
    await fsEx.copy(
      path.join(rootFolder, 'static'),
      path.join(buildFolder, 'dist', 'static'),
    );
    await writeFile(path.join(buildFolder, '404.html'), `
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="/dist/${wa.app.css}">
      </head>
      <body>
        <div id="app"></div>
        <script src="/dist/${wa.app.js}"></script>
      </body>
    </html>
    `);
    console.log('Builded at ' + (new Date));
    started = true;
  });
  (async () => {
    while (true) {
      await new Promise(res=>setTimeout(res, 2000));
      if (!started) continue;
      await buildData();
    }
  })();
};

main();

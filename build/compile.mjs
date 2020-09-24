import { serverCompiler, clientCompiler } from "./compiler.mjs";
import { buildData } from "./buildData.mjs";
import { rootFolder, buildFolder } from "../paths.mjs";
import fsEx from "fs-extra";
import path from "path";

const callback = (err, stats) => { // Stats Object
  if (err) {
    console.log(err);
    return;
  }
  console.log(stats.toString({ colors: true }));
};

const main = async () => {
  console.log('ah');
  serverCompiler.run(callback);
  clientCompiler.run(callback);
  await buildData();
  await fsEx.copy(
    path.join(rootFolder, 'static'),
    path.join(buildFolder, 'dist', 'static'),
  );
};

main();
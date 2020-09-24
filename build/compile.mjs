import { serverCompiler, clientCompiler } from "./compiler.mjs";
import { buildData } from "./buildData.mjs";
import { rootFolder, buildFolder } from "../paths.mjs";
import fsEx from "fs-extra";
import path from "path";
import fs from "fs";
import { promisify } from "util";

const rmdir = promisify(fs.rmdir);

const callback = (err, stats) => { // Stats Object
  if (err) {
    console.log(err);
    return;
  }
  console.log(stats.toString({ colors: true }));
};

const main = async () => {
  await rmdir(buildFolder, { recursive: true });
  serverCompiler.run(callback);
  clientCompiler.run(callback);
  await fsEx.copy(
    path.join(rootFolder, 'static'),
    path.join(buildFolder, 'dist', 'static'),
  );
  await buildData();
};

main();
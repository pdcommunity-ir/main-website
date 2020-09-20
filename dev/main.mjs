import { clientCompiler } from "./compiler.mjs";
import fs from "fs";
import { buildFolder } from "../paths.mjs";
import { promisify } from "util";

const rmdir = promisify(fs.rmdir);

const main = async () => {
  await rmdir(buildFolder, { recursive: true });
  clientCompiler.watch((err, stats) => {
    console.log('Builded at ' + (new Date));
  });
};

main();

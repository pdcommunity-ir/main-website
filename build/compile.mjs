import { serverCompiler, clientCompiler } from "./compiler.mjs";

const callback = (err, stats) => { // Stats Object
  if (err) {
    console.log(err);
    return;
  }
  console.log(stats.toString({ colors: true }));
};

const main = () => {
  console.log('ah');
  serverCompiler.run(callback);
  clientCompiler.run(callback);
};

main();
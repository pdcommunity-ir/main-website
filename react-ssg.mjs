import { cli } from "react-ssg/server.mjs";
import { rootFolder } from "./paths.mjs";

cli({
  path: {
    root: rootFolder,
  },
});

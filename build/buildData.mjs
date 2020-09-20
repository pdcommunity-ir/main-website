import { resolve } from "path";
import fs from "fs";
import { promisify } from "util";
import { contentFolder } from "../paths.mjs";
import YAML from "yamljs";
import path from "path";
import { buildFolder } from "../paths.mjs";
import Markdown from "markdown-it";

const md = new Markdown({ html: true });

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const getFiles = async (dir) => {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
};

export const buildData = async () => {
  const files = (await getFiles(contentFolder));
  const result = {};
  await Promise.all(files.map(async (f) => {
    try {
      if (f.endsWith('.yaml') || f.endsWith('.yml')) {
        const text = (await readFile(f)).toString();
        result[f.slice(contentFolder.length)] = YAML.parse(text);
      } else if (f.endsWith('.md')) {
        const text = (await readFile(f)).toString();
        if (text.startsWith('---')) {
          const sp = text.split('---');
          result[f.slice(contentFolder.length)] = {
            frontmatter: YAML.parse(sp[1]),
            html: md.render(sp.slice(2).join('---')),
          };
        } else {
          result[f.slice(contentFolder.length)] = md.render(text);  
        }
      }
    } catch(e) {
      console.log(`file ${f} ignored: ${e}`);
    }
  }));
  await writeFile(path.join(buildFolder, 'dist', 'data.bundle.json'), JSON.stringify(result));
};

buildData();
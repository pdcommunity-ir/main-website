import ReactDOMServer from "react-dom/server";
import { App } from "../src/App.jsx";
import React from "react";
import { StaticRouter } from "react-router-dom";
import fs from "fs";
import { promisify } from "util";
import path from "path";
import { SSRCC } from "../src/useSSRContent.js";
import { Helmet } from "react-helmet";

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const mkdir = promisify(fs.mkdir);

const removeMD = (x)=>{
  if (x.endsWith('.md')) {
    return x.slice(0, -3) + "/";
  }
};

const urlsBuilder = (data) => [
  "/", "/about/", "/faq/", "/articles/", "/blogs/", "/membership/",
  ...Object.keys(data).filter((x)=>x.startsWith('/articles/')).map(removeMD),
  ...Object.keys(data).filter((x)=>x.startsWith('/blogs/')).map(removeMD),
  ...Object.keys(data).filter((x)=>x.startsWith('/projects/')).map(removeMD),
  ...Object.keys(data).filter((x)=>x.startsWith('/licenses/markdown/'))
    .map(removeMD).map((x)=>`/license/${x.slice('/licenses/markdown/'.length)}`),
];

const htmlTemplate = (elem, helmet, wa) => `
<html ${helmet.htmlAttributes.toString()}>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">      
${helmet.title.toString()}
${helmet.meta.toString()}
${helmet.link.toString()}
${helmet.style.toString()}
<link rel="stylesheet" href="/dist/${wa.app.css}">
</head>
<body ${helmet.bodyAttributes.toString()}>
<div id="app">${elem}</div>
<script src="/dist/${wa.app.js}"></script>
</body>
</html>
`

const buildFolder = path.join(path.dirname(__dirname), 'public');

const getHtml = ({ data, webpackAsset }) => (url) => {
  const elem = ReactDOMServer.renderToString(
    <SSRCC.Provider value={data}>
      <StaticRouter location={url}>
        <App/>
      </StaticRouter>
    </SSRCC.Provider>
  );
  const helmet = Helmet.renderStatic();
  return htmlTemplate(elem, helmet, webpackAsset);
};

const main = async () => {
  try {
    const data = JSON.parse(
      (await readFile(path.join(buildFolder, 'dist', 'data.bundle.json'))
    ).toString());
    const webpackAsset = JSON.parse(
      (await readFile(path.join(__dirname, 'webpack-assets.json'))
    ).toString());
    const urls = urlsBuilder(data);
    const gh = getHtml({ data, webpackAsset });
    await Promise.all(urls.map(async (url)=>{
      const pu = path.join(buildFolder, `.${url}`);
      await mkdir(pu, { recursive: true });
      await writeFile(path.join(pu, 'index.html'), gh(url));
    }));
    await writeFile(path.join(buildFolder, '404.html'), gh('/404/'));
  } catch (e) {
    console.error(e);
  }
};

main();

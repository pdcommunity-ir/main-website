import ReactDOM from "react-dom";
import React from "react";
import { App } from "../src/App.jsx";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { SSRCC } from "../src/useSSRContent.js";
import { ContentContext } from "react-ssg";

const main = async () => {
  const data = await (await fetch("/dist/data.bundle.json", {
    cache: 'no-cache',
  })).json();
  ReactDOM.render(
    <ContentContext.Provider value={data}>
    <BrowserRouter><App/></BrowserRouter>
    </ContentContext.Provider>,
    document.getElementById('app'),
  );
};

main();

import React from 'react';
import Impress from "../../components/impress/Impress";
import Step from "../../components/impress/Step";
import { useContent } from 'react-ssg';
// styles of react-impressjs
import './impress.notmodule.css';
import { Helmet } from 'react-helmet';

const globalCss = `
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    text-align: center;
}

p {
  direction: rtl;
}

article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
    display: block;
}
body {
    line-height: 1;
}
ol, ul {
    list-style: none;
}
blockquote, q {
    quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
    content: '';
    content: none;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

body {
    font-family: 'PT Sans', sans-serif;
    min-height: 740px;

    background: black;
    color: white;
}

b, strong { font-weight: bold }
i, em { font-style: italic }

a {
    color: inherit;
    text-decoration: none;
    padding: 0 0.1em;
    background: rgba(255,255,255,0.5);
    text-shadow: -1px -1px 2px rgba(100,100,100,0.9);
    border-radius: 0.2em;

    -webkit-transition: 0.5s;
    -moz-transition:    0.5s;
    -ms-transition:     0.5s;
    -o-transition:      0.5s;
    transition:         0.5s;
}

a:hover,
a:focus {
    background: rgba(255,255,255,1);
    text-shadow: -1px -1px 2px rgba(100,100,100,0.5);
}`;

const merge = (a, b, i) => {
  if (!a) a = {};
  if (!b) b = {};
  a = {
    x: 0, y: 0, scale: 1, xt: 0, yt: 0, ...a,
  };
  b = {
    x: 0, y: 0, scale: 1, xt: 0, yt: 0, ...b,
  };
  return {
    x: a.x + a.xt * i + b.x,
    y: a.y + a.yt * i + b.y,
    xt: b.xt,
    yt: b.yt,
    scale: a.scale * b.scale,
  };
};

const dfs = (node) => {
  if (node.type === 'group') {
    return node.child.flatMap((c, i) => {
      console.log(c, i);
      return dfs({
        ...c,
        data: merge(node.data, c.data, i),
      });
    });
  } else {
    return [node];
  }
};

export const IntroPage = () => {
  const data = useContent('/intro.yml').slides;
  const demo = dfs({
    type: 'group',
    child: data,
  });
  return (
    <Impress progress={true}>
      <Helmet><style>{globalCss}</style></Helmet>
    {
      demo.map( (d, index ) => {
        console.log(d);
        return (
          <Step id={d.id} className={d.className} data={d.data} key={index}>
            <div dangerouslySetInnerHTML={{ __html: d.content }}>
            </div>
          </Step>
        );
      })
    }
    </Impress>
  );
};

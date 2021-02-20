import React from 'react';
import { Impress, Step } from 'react-impressjs';
import { useContent } from 'react-ssg';
// styles of react-impressjs
import './impress.notmodule.css';

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

import React, { useState } from 'react';
import Impress from "../../components/impress/Impress";
import Step from "../../components/impress/Step";
import { useContent } from 'react-ssg';
import { Helmet } from 'react-helmet';
import { Layout } from '../../components/Layout.jsx';
import { SEO } from '../../components/SEO.jsx';
import { Button } from 'react-bootstrap';
import { globalCss } from "./css.jsx";

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

const finalFBuilder = (params) => {
  const xz = params.isRTL ? -1 : 1;
  return  (d) => {
    return {
      ...d, x: d.x * xz,
    };
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
  const data = useContent('/intro.yml');
  const demo = dfs({
    type: 'group',
    child: data.slides,
  });
  const finalF = finalFBuilder(data);
  const [started, setStarted] = useState(false);
  if (!started) {
    return (
        <Layout>
            <SEO title="آشنایی با داده های عمومی"/>
            <p style={{margin: '3rem 0 3rem 0', textAlign: 'center'}}>{data.initMessage}</p>
            <div style={{margin: '3rem 0 3rem 0', textAlign: 'center'}}>
                <Button onClick={()=>setStarted(true)}>{data.buttonMessage}</Button>
            </div>
        </Layout>
    );
  }
  return (
    <Impress progress={true}>
      <Helmet><style>{globalCss}</style></Helmet>
    {
      demo.map( (d, index ) => {
        return (
          <Step id={d.id} className={d.className} data={finalF(d.data)} key={index}>
            <div dangerouslySetInnerHTML={{ __html: d.content }}>
            </div>
          </Step>
        );
      })
    }
    </Impress>
  );
};

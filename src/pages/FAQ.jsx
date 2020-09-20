import React, { useState } from "react"

import { Layout } from "../components/Layout.jsx"
import { SEO } from "../components/SEO.jsx"
import styles from "./faq.module.css";
import classNames from "classnames";
import { useSSRContent } from "../useSSRContent";
import { HtmlElement } from "../components/HtmlElement.jsx";

const Question = ({ q }) => {
  const [active, setActive] = useState(false);
  return ( <div onClick={()=>setActive(!active)}>
    <div className={classNames({
      [styles.accordion]: true,
      [styles.active]: active,
    })}>
      <span className={styles.bilbilak}>{active ? '➖' : '➕'}</span>
      <h2>{q.question}</h2>
    </div>
    <HtmlElement
      className={classNames({
        [styles.panel]: true,
        [styles.show]: active,
      })}
      content={q.answer}
    />
  </div> );
};

export const FAQ = () => {
  const data = useSSRContent('/faq.yml');
  return (
    <Layout>
      <SEO title={data.title}/>
      <h1>{data.title}</h1>
      <HtmlElement content={data.description}/>
      {data.questions.map((q)=>(
        <Question key={q.question} q={q}/>
      ))}
    </Layout>
  );
};

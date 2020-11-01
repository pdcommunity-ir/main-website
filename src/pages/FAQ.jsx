import React, { useState } from "react"

import { Layout } from "../components/Layout.jsx"
import { SEO } from "../components/SEO.jsx"
import styles from "./faq.module.css";
import classNames from "classnames";
import { useContent } from "react-ssg";
import { HtmlElement } from "../components/HtmlElement.jsx";
import { Link } from "react-router-dom";

const Question = ({ q }) => {
  const [active, setActive] = useState(false);
  const data = useContent();
  const w = data['/faq.yml'].words;
  return ( <div onClick={()=>setActive(!active)}>
    <div className={classNames({
      [styles.accordion]: true,
      [styles.active]: active,
    })}>
      <span className={styles.bilbilak}>{active ? '➖' : '➕'}</span>
      <h2>{q.question}</h2>
    </div>
    <div className={classNames({
      [styles.panel]: true,
      [styles.show]: active,
    })}>
      <HtmlElement
        content={q.answer}
      />
      {q.related && <p>
        <h5>{w.related}:</h5>
        <ul>
          {q.related.map((x)=>{
            const title = data[`/articles/${x}.md`].frontmatter.title;
            return <li><Link key={x} to={`/articles/${x}/`}>{title}</Link></li>;
          })}
        </ul>
      </p>}
    </div>
  </div> );
};

export const FAQ = () => {
  const data = useContent('/faq.yml');
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

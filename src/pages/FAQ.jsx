import React, { useState } from "react"

import { Layout } from "../components/Layout.jsx"
import { SEO } from "../components/SEO.jsx"
import styles from "./faq.module.css";
import classNames from "classnames";
import { useContent } from "react-ssg";
import { HtmlElement } from "../components/HtmlElement.jsx";
import { Link, useParams } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";

const Question = ({ q, defaultActive = false, r }) => {
  const [active, setActive] = useState(defaultActive);
  const [showToast, setShowToast] = useState(false);
  const data = useContent();
  const w = data['/faq.yml'].words;
  return ( <div onClick={()=>setActive(!active)}>
    <div className={classNames({
      [styles.accordion]: true,
      [styles.active]: active,
    })} ref={r}>
      <span className={styles.bilbilak}>{active ? '➖' : '➕'}</span>
      <h2 className={styles.title}>{q.question}</h2>
      <Button
        variant="primary" className={styles.copyButton}
        onClick={async (e)=>{
          e.stopPropagation();
          const t = `${window.location.origin}/faq/${q.id}/`;
          await navigator.clipboard.writeText(t);
          setShowToast(true);
          await new Promise((res) => setTimeout(res, 1000));
          setShowToast(false);
        }}
      >
        {showToast ? "لینک سوال کپی شد" : <i className="fa fa-copy"/>}
      </Button>
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
            return <li key={x}><Link to={`/articles/${x}/`}>{title}</Link></li>;
          })}
        </ul>
      </p>}
    </div>
  </div> );
};

export const FAQ = () => {
  const data = useContent('/faq.yml');
  const { id } = useParams('id');
  const sq = useRef();
  useEffect(() => {
    if (sq.current) {
      sq.current.scrollIntoView({
        block: 'center',
      });
    }
  }, [id]);
  return (
    <Layout>
      <SEO title={data.title}/>
      <h1>{data.title}</h1>
      <HtmlElement content={data.description}/>
      {data.questions.map((q)=>{
        if (id === q.id) {
          return (
            <Question key={q.question} q={q} defaultActive r={sq}/>
          );
        }
        return <Question key={q.question} q={q}/>;
      })}
    </Layout>
  );
};

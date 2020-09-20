import React from "react"
import { Link } from "react-router-dom";

import { Layout } from "../components/Layout.jsx"
import { SEO } from "../components/SEO.jsx"
import { useSSRContent } from "../useSSRContent.js";

const f = (a) => a.map((x) => (
  <li key={x.url}>
    <Link to={x.url}>
      {x.title}
    </Link>
  </li>
)); 

export const ArticleIndex = () => {
  const data = useSSRContent();
  const articles = Object.keys(data)
    .filter((x) => x.startsWith('/articles/'))
    .map((x) => {
      if (x.endsWith('.md')) {
        return {
          url: x.slice(0, -3) + '/',
          title: data[x].frontmatter.title,
          incomplete: data[x].frontmatter.incomplete,
        };
      }
      return {
        url: '/404/',
        title: 'broooooooooooooooooooooooooken',
      };
    });
  return ( <Layout>
    <SEO title="فهرست مقالات"/>
    <h1>فهرست مقالات</h1>
    <p>
      در این صفحه نوشته های مرتبط با جمعیت داده های عمومی جمع آوری شده است.
    </p>
    <ul>
      {f(articles.filter((x) => !x.incomplete))}
    </ul>
    <h2>پیش نویس ها</h2>
    <ul>
      {f(articles.filter((x) => x.incomplete))}
    </ul>
  </Layout> );
};
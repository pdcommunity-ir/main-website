import React from "react"
import { Link } from "react-router-dom";

import { Layout } from "../components/Layout.jsx"
import { SEO } from "../components/SEO.jsx"
import { useSSRContent } from "../useSSRContent.js";
import { indexMarkdownFolder } from "../util/indexFolder.js";

const f = (a) => a.map((x) => (
  <li key={x.url}>
    <Link to={x.url}>
      {x.title}
    </Link>
  </li>
)); 

export const ArticleIndex = () => {
  const data = useSSRContent();
  const articles = indexMarkdownFolder(data, 'articles');
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
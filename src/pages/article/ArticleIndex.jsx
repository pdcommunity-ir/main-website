import React from "react"
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { Layout } from "../../components/Layout.jsx"
import { SEO } from "../../components/SEO.jsx"
import { useSSRContent } from "../../useSSRContent.js";
import { indexMarkdownFolder } from "../../util/indexFolder.js";

const filterArticles = (articles, cn) => articles.filter(
  ({ category = [] }) => category.find((y) => y === cn)
);

const f = (articles, categories) => categories.map((x) => {
  const ax = filterArticles(articles, x.name);
  if (ax.length === 0) return undefined;
  return (
    <li key={x.name}>
      {x.label}
      <ul>
        {ax.map((y)=> (
          <li key={y.url}>
            <Link to={y.url}>
              {y.title}
            </Link>
          </li>
        ))}    
      </ul>
    </li>
  );
}); 

export const ArticleIndex = () => {
  const data = useSSRContent();
  const categories = data['/category.yml'].items;
  const words = data['/article.yml'].index;
  const articles = indexMarkdownFolder(data, 'articles');
  const badCat = articles.filter((x)=>x.category.find((y)=>!categories.find((z)=>z.name === y)))
  return ( <Layout>
    <SEO title={words.title}/>
    {badCat.length !== 0 && <div>
      <h1>Bad categories</h1>
      {JSON.stringify(badCat)}
    </div>}
    <h1>{words.title}</h1>
    <p>{words.description}</p>
    <ul>
      {f(articles.filter((x) => !x.incomplete), categories)}
    </ul>
    <h2>{words.draft.title}</h2>
    <p>
      {words.draft.description} <HashLink to="/about#contact">{words.draft.contact}</HashLink>
    </p>
    <ul>
      {f(articles.filter((x) => x.incomplete), categories)}
    </ul>
  </Layout> );
};
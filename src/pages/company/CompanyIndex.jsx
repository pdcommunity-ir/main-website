import React from "react"
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { Layout } from "../../components/Layout.jsx"
import { SEO } from "../../components/SEO.jsx"
import { useContent } from "react-ssg";
import { indexMarkdownFolder } from "../../util/indexFolder.js";
import { Card } from "react-bootstrap";
import { CardColumns } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { HtmlElement } from "../../components/HtmlElement.jsx";
import { buildFunctions } from "./util.js";

const fields = [
  'title', 'industry', 'type', 'business',
  'marketCap', 'revenue', 'employee',
];

export const CompanyIndex = () => {
  const data = useContent();
  const words = data['/company.yml'];
  const companies = indexMarkdownFolder(data, 'companies');
  const { getValue } = buildFunctions(words);
  return ( <Layout>
    <SEO title={words.index.title}/>
    <h1>{words.index.title}</h1>
    <HtmlElement content={words.index.description}/>
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {fields.map((x) => <td key={x}>{words.tagMeta.index[x]}</td>)}
        </tr>
      </thead>
      <tbody>
      {companies.map((x) => (
        <tr>
          {fields.map((y) => {
            if (y === 'title') {
              return <td key={y}><Link to={x.url}>{x.title}</Link></td>;
            }
            return (<td key={y}>{getValue(x, y)}</td>);
          })}
        </tr>
      ))}
      </tbody>
    </Table>
  </Layout> );
};
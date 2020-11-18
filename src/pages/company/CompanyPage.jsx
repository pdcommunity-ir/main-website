import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout.jsx';
import { Row, Col } from 'react-bootstrap';
import { useContent } from 'react-ssg';
import { HtmlElement } from '../../components/HtmlElement.jsx';
import { SEO } from '../../components/SEO.jsx';
import { NotFoundPage } from '../NotFoundPage.jsx';
import { buildFunctions } from './util.js';

export const CompanyPage = () => {
  const { id } = useParams('id');
  const db = useContent();
  const dfull = db[`/companies/${id}.md`];
  const words = db['/company.yml'];
  if (!dfull) {
    return <NotFoundPage/>;
  }
  const d = dfull.frontmatter;
  const { getValue } = buildFunctions(words);
  const f1 = (d, t) => {
    const a = words.tagMeta.index[t];
    const b = getValue(d, t);
    return (
      <li>{a}: {b}</li>
    );
  };
  return (
    <Layout>
      <SEO title={d.title}/>
      <h1 style={{ paddingTop: '1rem', paddingBottom: '1rem'}}>
        {d.title}
      </h1>
      <Row>
        <Col md={9}>
          <HtmlElement content={dfull.html}/>
        </Col>
        <Col md={3}>
          <div style={{ position: 'sticky', top: '100px' }}>
            <h3>اطلاعات جانبی</h3>
            <ul>
              {f1(d, 'industry')}
              {f1(d, 'type')}
              {f1(d, 'business')}
              {f1(d, 'employee')}
              {f1(d, 'revenue')}
              {f1(d, 'marketCap')}
              {d.links && <li>
                پیوند های مفید:
                <ul>
                  <li><a href={d.links.website}>وبسایت</a></li>
                  <li><a href={d.links.wikipedia}>ویکی پدیا</a></li>
                </ul>
              </li>}
            </ul>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

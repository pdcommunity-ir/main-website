import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout.jsx';
import { Row, Col } from 'react-bootstrap';
import { useSSRContent } from '../../useSSRContent.js';
import { HtmlElement } from '../../components/HtmlElement.jsx';
import { SEO } from '../../components/SEO.jsx';

export const ArticlePage = () => {
  const { id } = useParams('id');
  const db = useSSRContent();
  const d = db[`/articles/${id}.md`];
  return (
    <Layout>
      <SEO title={d.frontmatter.title}/>
      <h1 style={{ paddingTop: '1rem', paddingBottom: '1rem'}}>
        {d.frontmatter.title}
      </h1>
      <Row>
        <Col md={9}>
          {d.frontmatter.incomplete && <p style={{ fontStyle: 'italic' }}>
            این مقاله پیش‌نویس است و محتوای آن کامل نیست.
          </p>}
          <HtmlElement content={d.html}/>
        </Col>
        <Col md={3}>
          <div style={{ position: 'sticky', top: '100px' }}>
            <h3>مطالب مرتبط</h3>
            <ul>
              {d.frontmatter.related && d.frontmatter.related.map((x) => {
                const dx = db[`/articles/${x}.md`];
                if (!dx) {
                  console.log('not found article '+x);
                  return undefined;
                }
                return (
                  <li key={x} >
                    <Link to={`/articles/${x}/`}>
                      {dx.frontmatter.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

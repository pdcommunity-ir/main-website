import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout.jsx';
import { Row, Col } from 'react-bootstrap';
import { useContent } from 'react-ssg';
import { HtmlElement } from '../../components/HtmlElement.jsx';
import { SEO } from '../../components/SEO.jsx';
import { NotFoundPage } from '../NotFoundPage.jsx';
import readingTime from "reading-time";

export const ArticlePage = () => {
  const { id } = useParams('id');
  const db = useContent();
  const d = db[`/articles/${id}.md`];
  const time = Math.round(readingTime(d.html).minutes);
  if (!d) {
    return <NotFoundPage/>;
  }
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
          {d.frontmatter.tldr && <div style={{
            backgroundColor: 'wheat', padding: '1rem', borderRadius: '1rem',
            border: '2px dashed', marginBottom: '1rem',
          }}>
            <h4>در این نوشته می خوانید:</h4>
            <ul style={{ marginBottom: '0' }}>
              {d.frontmatter.tldr.map((k) => (
                <li>{k}</li>
              ))}
            </ul>
          </div>} 
          <p style={{ fontStyle: 'italic' }}>
            زمان مطالعه: {time} دقیقه
          </p>
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

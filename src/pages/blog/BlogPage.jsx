import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout.jsx';
import { Row, Col } from 'react-bootstrap';
import { useContent } from 'react-ssg';
import { HtmlElement } from '../../components/HtmlElement.jsx';
import { SEO } from '../../components/SEO.jsx';
import { indexMarkdownFolder } from '../../util/indexFolder.js';
import { NotFoundPage } from '../NotFoundPage.jsx';

export const BlogPage = () => {
  const { id } = useParams('id');
  const db = useContent();
  const d = db[`/blogs/${id}.md`];
  if (!d) {
    return <NotFoundPage/>
  }
  const blogs = indexMarkdownFolder(db, 'blogs').sort((a, b) => a.date < b.date ? 1 : -1).slice(0, 3);
  return (
    <Layout>
      <SEO title={d.frontmatter.title}/>
      <h1 style={{ paddingTop: '1rem', paddingBottom: '1rem'}}>
        {d.frontmatter.title}
      </h1>
      <Row>
        <Col md={9}>
          <p style={{ fontStyle: 'italic' }}>
            {new Date(d.frontmatter.date).toLocaleDateString('fa-IR', {
              day: 'numeric',
              year: 'numeric',
              month: 'long',
            })}
          </p>
          <HtmlElement content={d.html}/>
        </Col>
        <Col md={3}>
          <div style={{ position: 'sticky', top: '100px' }}>
            <h3>آخرین مطالب</h3>
            <ul>
              {blogs.map((x) => {
                return (
                  <li key={x.url} >
                    <Link to={x.url}>
                      {x.title}
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

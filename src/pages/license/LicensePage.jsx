import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout.jsx';
import { Row, Col } from 'react-bootstrap';
import { useContent } from 'react-ssg';
import { HtmlElement } from '../../components/HtmlElement.jsx';
import { StatusBadge } from '../../components/StatusBadge.jsx';
import { SEO } from '../../components/SEO.jsx';
import { NotFoundPage } from '../NotFoundPage.jsx';

export const LicensePage = () => {
  const { id } = useParams('id');
  const dd = useContent(`/licenses/markdown/${id}.md`);
  if (!dd) {
    return <NotFoundPage/>
  }
  const d = dd.frontmatter;
  return (
    <Layout>
      <SEO title={d.title}/>
      <h1 style={{ paddingTop: '1rem', paddingBottom: '1rem'}}>
        <img 
          style={{ height: '7rem', borderRadius: '.5rem' }}
          src={`/dist/static/images/license/${id}.svg`}
        /> {d.title}
      </h1>
      <HtmlElement content={dd.html}/>
    </Layout>
  );
};

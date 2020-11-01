import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout.jsx';
import { Row, Col } from 'react-bootstrap';
import { useContent } from 'react-ssg';
import { HtmlElement } from '../../components/HtmlElement.jsx';
import { StatusBadge } from '../../components/StatusBadge.jsx';
import { SEO } from '../../components/SEO.jsx';
import { NotFoundPage } from '../NotFoundPage.jsx';

export const ProjectPage = () => {
  const { id } = useParams('id');
  const dd = useContent(`/projects/${id}.md`);
  if (!dd) {
    return <NotFoundPage/>
  }
  const d = dd.frontmatter;
  return (
    <Layout>
      <SEO title={d.title}/>
      <h1 style={{ paddingTop: '1rem', paddingBottom: '1rem'}}>
        {d.title}
      </h1>
      <div style={{ paddingBottom: '1rem'}}>
        وضعیت: <StatusBadge value={d.status}/>
        <br/>
        {d.link && <> لینک: <a href={`//${d.link}/`}>{d.link}</a> </>}
      </div>
      <HtmlElement content={dd.html}/>
    </Layout>
  );
};

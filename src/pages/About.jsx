import React, { useState } from "react"
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout.jsx";
import { SectionYml } from "../components/SectionYml.jsx";
import { SEO } from "../components/SEO.jsx";
import { StatusBadge } from "../components/StatusBadge.jsx";
import { useContent } from "react-ssg";
import { indexMarkdownFolder } from "../util/indexFolder.js";

const AboutSpecial = ({ section }) => {
  const data = useContent();
  const projects = indexMarkdownFolder(data, 'projects');
  projects.sort((a, b) => b.year - a.year);
  return ( <Container>
    <h1>{section.title}</h1>
    <ul>
      {projects.map((x) => (
        <li key={x.url}>
          <Link to={x.url}>
            {x.title}
          </Link> (<StatusBadge value={x.status}/>)
        </li>
      ))}
    </ul>
  </Container> );
}

export const About = () => {
  const data = useSSRContent('/about.yml');
  return (
    <Layout pure>
      <SEO title={data.title}/>
      <SectionYml sections={data.sections} special={AboutSpecial}/>
    </Layout>
  );
};

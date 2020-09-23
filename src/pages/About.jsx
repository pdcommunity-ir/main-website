import React, { useState } from "react"
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout.jsx";
import { SectionYml } from "../components/SectionYml.jsx";
import { SEO } from "../components/SEO.jsx";
import { StatusBadge } from "../components/StatusBadge.jsx";
import { useSSRContent } from "../useSSRContent.js";

const AboutSpecial = ({ section }) => {
  const data = useSSRContent();
  const projects = Object.keys(data)
    .filter((x) => x.startsWith('/projects/'))
    .map((x) => {
      if (x.endsWith('.yml')) {
        return {
          url: x.slice(0, -4) + '/',
          ...data[x],
        };
      }
      return {
        url: '/404/',
        title: 'broooooooooooooooooooooooooken',
      };
    });
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

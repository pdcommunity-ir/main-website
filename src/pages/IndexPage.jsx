import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { Layout } from "../components/Layout.jsx"
import { SEO } from "../components/SEO.jsx"
import { useSSRContent } from "../useSSRContent.js";
import styles from "./IndexPage.module.css";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useInView } from "react-intersection-observer";
import Typed from 'react-typed';
import { SectionYml } from "../components/SectionYml.jsx";

export const IndexPage = () => {
  const data = useSSRContent('/home.yml');
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: .1,
  });
  return (
    <Layout pure navbar={{
      bg: inView ? '#000' : '#f44333',
      fg: inView ? '#f44333' : '#fff',
    }}>
      <SEO title={data.header.name}/>
      <div ref={ref} className={styles.header}>
        <img className={styles.headerImage} src="/dist/static/images/main-background.svg"/>
        <h1 className={styles.headerName}>{data.header.name}</h1>
        <p className={styles.headerText}>
          <Typed 
            strings={data.header.adj} loop
            typeSpeed={30} backDelay={2000}
          /> {data.header.forall}
        </p>
        <Button size="lg" variant="primary" as="a" href="#section0">
          {data.header.button}
        </Button>
      </div>
      <SectionYml sections={data.sections}/>
    </Layout>
  );
};

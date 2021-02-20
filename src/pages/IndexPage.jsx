import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { Layout } from "../components/Layout.jsx"
import { SEO } from "../components/SEO.jsx"
import { useContent } from "react-ssg";
import styles from "./IndexPage.module.css";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useInView } from "react-intersection-observer";
import Typed from 'react-typed';
import { SectionYml } from "../components/SectionYml.jsx";

export const IndexPage = () => {
  const data = useContent('/home.yml');
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: .1,
  });
  const isBlack = entry ? inView : true;
  return (
    <Layout pure navbar={{
      bg: isBlack ? '#000' : '#f44333',
      fg: isBlack ? '#f44333' : '#fff',
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
        <Button size="lg" variant="primary" as="a" href="/intro">
          {data.header.button}
        </Button>
      </div>
      <SectionYml sections={data.sections}/>
    </Layout>
  );
};

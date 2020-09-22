import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { Layout } from "../components/Layout.jsx"
import { SEO } from "../components/SEO.jsx"
import { useSSRContent } from "../useSSRContent.js";
import classNames from "classnames";
import { Row, Col } from "react-bootstrap";
import styles from "./IndexPage.module.css";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Navbar } from "../components/navbar/Navbar.jsx";
import { useInView } from "react-intersection-observer";
import Typed from 'react-typed';

const MyButtons = ({ x, i }) => (
  <div className={styles.center}>
    <Button variant="secondary" size="lg" as={Link} to={x.otherButton.link}>
      {x.otherButton.label}
    </Button>
    &emsp;
    <Button variant="primary" size="lg" as="a" href={`#section${i+1}`}>
      {x.primaryButton}
    </Button>
  </div>
);

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
      <SEO title="داده های عمومی"/>
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
      {data.sections.map((x, i) => {
        const inner = (()=>{
          if (x.type === 'classic') {
            return (
              <Container><Row>
                <Col md={4} className={styles.fontImage}>
                  <i className={`fa fa-copy`}/>
                </Col>
                <Col md={8}>
                  <h1>{x.title}</h1>
                  <p dangerouslySetInnerHTML={{ __html: x.text}}/>
                  <MyButtons x={x} i={i}/>
                </Col>    
              </Row></Container>
            );
          }
          if (x.type === 'multi') {
            return (
              <Container>
                <h1>{x.title}</h1>
                {x.sections.map((y, j) => {
                  return (
                    <Row key={j} className={styles.rowMulti}>
                      <Col md={{ span: 4, order: j%2 }} className={styles.fontImage}>
                        <i className={`fa ${y.icon}`}/>
                      </Col>
                      <Col md={{ span: 8, order: 1-(j%2) }}>
                        <h1>{y.title}</h1>
                        <p dangerouslySetInnerHTML={{ __html: y.text}}/>
                      </Col>
                    </Row>
                  );
                })}
                <div className={styles.center}>
                  <p>{x.text.end}</p>
                  <MyButtons x={x} i={i}/>
                </div> 
              </Container>
            )
          }
          if (x.type === 'table3') {
            return (
              <Container>
                <h1 className={styles.center}>{x.text.title}</h1>
                <Row className={styles.rowMulti}>
                {x.sections.map((y) => {
                  return (
                    <Col
                      key={y.title} md={4}
                      className={styles.center}
                    >
                      <div className={styles.fontImageSmall}>
                        <i className={`fa ${y.icon}`}/>
                      </div>
                      <h4 className={styles.margin1}>{y.title}</h4>
                      <p dangerouslySetInnerHTML={{ __html: y.text}}/>
                      <Button
                        size="lg" variant="primary" 
                        as={y.button.link.slice(0, 2) === '//' ? 'a' : Link}
                        to={y.button.link}
                        href={y.button.link}
                      >
                        {y.button.label}
                      </Button>
                    </Col>
                  );
                })}
                </Row>
                <div className={styles.endMulti}>
                  <p>{x.text.end}</p>
                  <MyButtons x={x} i={i}/>
                </div> 
              </Container>
            )
          }
        })();
        return (
          <div key={i} className={classNames({
            [styles.commonDiv]: true,
            [styles.oddDiv]: i % 2 === 1,
            [styles.evenDiv]: i % 2 === 0,
          })} id={`section${i}`}>
            {inner}
          </div>
        );
      })}
    </Layout>
  );
};

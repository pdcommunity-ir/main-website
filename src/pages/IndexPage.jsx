import React from "react"
import { Link } from "react-router-dom"

import { Layout } from "../components/Layout.jsx"
import { SEO } from "../components/SEO.jsx"
import { useSSRContent } from "../useSSRContent.js";
import classNames from "classnames";
import { Row, Col } from "react-bootstrap";
import styles from "./IndexPage.module.css";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";

export const IndexPage = () => {
  const data = useSSRContent('/home.yml');
  return (
    <Layout pure>
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
                  <Button variant="secondary" size="lg" as={Link} to={x.otherButton.link}>
                    {x.otherButton.label}
                  </Button>
                  &emsp;
                  <Button variant="primary" size="lg" as="a" href={`#section${i+1}`}>
                    {x.primaryButton}
                  </Button>
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
                <p>{x.text.end}</p> 
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

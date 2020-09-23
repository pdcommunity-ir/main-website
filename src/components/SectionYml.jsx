import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import classNames from "classnames";
import { Row, Col } from "react-bootstrap";
import styles from "../pages/IndexPage.module.css";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { HtmlElement } from "./HtmlElement.jsx";


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

export const SectionYml = ({ sections, special: SpecialHandler }) => (
  <>
    {sections.map((x, i) => {
      const inner = (()=>{
        if (x.type === 'special') {
          return <SpecialHandler section={x}/>
        }
        if (x.type === 'text') {
          return (
            <Container>
              <h1>{x.title}</h1>
              <HtmlElement content={x.text}/> 
            </Container>
          )
        }
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
              <Row>
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
  </>
);

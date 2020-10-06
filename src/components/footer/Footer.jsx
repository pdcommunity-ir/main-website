import React from "react";
import styles from "./Footer.module.css";
import { Row, Col, Container } from "react-bootstrap";
import { useSSRContent } from "../../useSSRContent.js";
import { HtmlElement } from "../HtmlElement.jsx";
import { Link } from "react-router-dom";

export const Footer = () => {
  const data = useSSRContent('/footer.yml');
  return (
    <footer className={styles.back}>
      <Container fluid><Row>
        <Col md={3}>
          <img src="/dist/static/images/logo/transparent-white.svg" className={styles.logo}/>
          <p>{data.name}</p>
        </Col>
        <Col md={6}>
          <div className={styles.contactUs}>
            <p>
              <a href="/about#contact">{data.contact.label}</a>
            </p>
            <div className={styles.logos}>
              {data.contact.items.map((x)=>(
                <>
                  <a href={x.link}>
                    <i className={`fa ${x.icon} w3-hover-opacity`}/>
                  </a>{' '}
                </>  
              ))}
            </div>
          </div>
          <HtmlElement className={styles.license} content={data.credit}/>
        </Col>
        <Col md={3}>
          {data.links.label}
          <br/>
          {data.links.items.map((x)=>(<><Link to={x.href}>{x.label}</Link><br/></>))}
        </Col>
      </Row></Container>
    </footer>
  )
};

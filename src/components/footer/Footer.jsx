import React from "react";
import styles from "./Footer.module.css";
import { Row, Col, Container } from "react-bootstrap";
import { useSSRContent } from "../../useSSRContent.js";
import { HtmlElement } from "../HtmlElement.jsx";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

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
              <HashLink to="/about#contact">{data.contact.label}</HashLink>
            </p>
            <div className={styles.logos}>
              {data.contact.items.map((x)=>(
                <React.Fragment key={x.link}>
                  <a href={x.link}>
                    <i className={`fa ${x.icon} w3-hover-opacity`}/>
                  </a>{' '}
                </React.Fragment>  
              ))}
            </div>
          </div>
          <HtmlElement className={styles.license} content={data.credit}/>
        </Col>
        <Col md={3}>
          {data.links.label}
          <br/>
          {data.links.items.map((x)=>(
            <React.Fragment key={x.href}><Link to={x.href}>{x.label}</Link><br/></React.Fragment>
          ))}
        </Col>
      </Row></Container>
    </footer>
  )
};

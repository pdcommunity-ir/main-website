import React from "react";
import styles from "./Footer.module.css";
import { Row, Col, Container } from "react-bootstrap";

export const Footer = () => {
  return (
    <footer className={styles.back}>
      <Container fluid><Row>
        <Col md={3}>
          <img src="/dist/static/images/logo/transparent-white.svg" className={styles.logo}/>
          <p> جمعیت داده های عمومی</p>
        </Col>
        <Col md={6}>
          <div className={styles.contactUs}>
            <p>
              <a href="/about#contact">تماس با ما:</a>
            </p>
            <div className={styles.logos}>
              <a href="mailto:info@pdcommunity.ir"><i className="fa fa-envelope w3-hover-opacity"></i></a>
              {' '}<a href="https://t.me/pdcommunity_ir"><i className="fa fa-telegram w3-hover-opacity"></i></a>
              {' '}<a href="https://matrix.to/#/#pdcommunity_room:matrix.org"><i className="fa fa-matrix-org w3-hover-opacity"></i></a>
              {' '}<a href="https://www.open.tube/accounts/pdcommunity@open.tube/video-channels"><i className="fa fa-peertube w3-hover-opacity"></i></a>
              {' '}<a rel="me" href="https://mas.to/@pdcommunity"><i className="fa fa-mastodon w3-hover-opacity"></i></a>
            </div>
          </div>
          <p>
            قدرت گرفته از <a href="https://www.gatsbyjs.com/" target="_blank">
              Gatsby
            </a>
          </p>
          <p className={styles.license}> 
            <a href="https://framagit.org/pdcommunity/new-site">
              منبع این سایت
            </a> تحت <a href="/license/gpl3">  
              پروانه عام گنو نسخه ۳
            </a> و محتوا تحت پروانه <a href="/license/cc0">
              کریتیو کامانز صفر
            </a> به صورت عمومی در دسترس است
          </p>
        </Col>
        <Col md={3}>
          پیوندهای مفید:
          <br/>
          <a href="/articles/proprietary-problems/">داده های انحصاری چه مشکلاتی دارند؟</a>
          <br/>
          <a href="/articles/why-someone-make-common-data/">انگیزه های تولید داده عمومی</a>
          <br/>
          <a href="/articles/prevent-make-proprietary/">چگونه داده انحصاری تولید نکنیم؟</a>
          <br/>
          <a href="/articles/public-data-dream/">رویای داده های عمومی</a>
          <br/>
          <a href="/license">پروانه های حق تکثیر</a>
          <br/>
        </Col>
      </Row></Container>
    </footer>
  )
};

/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect } from "react"

import Header from "./header"
import { Footer } from "./footer/Footer"
import { Helmet } from "react-helmet"
import { Container } from "react-bootstrap"
import { Navbar } from "./navbar/navbar"

export const Layout = ({ children, pure }) => {
  return (
    <>
      <Helmet bodyAttributes={{ dir: 'rtl' }}>
        <link type="text/css" rel="stylesheet" href="/dist/static/bootstrap.css"/>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/fork-awesome@1.1.7/css/fork-awesome.min.css"
          integrity="sha256-gsmEoJAws/Kd3CjuOQzLie5Q3yshhvmo7YNtBG7aaEY="
          crossorigin="anonymous"
        />
        <style>
          {`@font-face {
          font-family: Vazir;
          src: url('/dist/static/Vazir.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          }
          body,h1,h2,h3,h4,h5,h6 {font-family: Vazir}`}
        </style>
      </Helmet>
      <Navbar/>
      {pure ? children : <>
        <div style={{ height: '64px' }}/>
        <Container>{children}</Container>
      </>}
      <Footer/>
    </>
  )
};

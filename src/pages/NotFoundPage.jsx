import React from "react"
import { Link } from "react-router-dom"

import { Layout } from "../components/Layout.jsx"
import { SEO } from "../components/SEO.jsx"
import { HashLink } from 'react-router-hash-link';

export const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>صفحه مورد نظر شما یافت نشد :(</h1>
    <p>
      شما می توانید:
      <ul>
        <li>
          <Link to="/articles">یک مقاله تصادفی مطالعه کنید</Link>
        </li>
        <li>
          <Link to="/">به صفحه اصلی بروید</Link>
        </li>
        <li>
          <HashLink to="/about#contact">
            با ما تماس بگیرید تا این صفحه را ایجاد کنیم
          </HashLink>
        </li>
      </ul>
    </p>
  </Layout>
);

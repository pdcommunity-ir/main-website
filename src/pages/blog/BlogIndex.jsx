import React from "react"
import { Link } from "react-router-dom";

import { Layout } from "../../components/Layout.jsx"
import { SEO } from "../../components/SEO.jsx"
import { useContent } from "react-ssg";
import { indexMarkdownFolder } from "../../util/indexFolder.js";

const f = (a) => a.map((x) => (
  <li key={x.url}>
    <Link to={x.url}>
      {x.title}
    </Link>
  </li>
));

const groupByDate = (blogs) => {
  const blogByDate = [{
    year: blogs[0].dd.year,
    data: [{
      month: blogs[0].dd.month,
      data: [],
    }],
  }];
  let curY = blogByDate[0].data;
  let curM = curY[0].data;
  curM.push(blogs[0]);
  for (let i = 1; i < blogs.length; i += 1) {
    const pv = blogs[i - 1], cr = blogs[i];
    if (pv.dd.year !== cr.dd.year) {
      curM = [];
      curY = [{
        month: cr.dd.month,
        data: curM,
      }];
      blogByDate.push({
        year: cr.dd.year,
        data: curY,
      });
    } else if (pv.dd.month !== cr.dd.month) {
      curM = [];
      curY.push({
        month: cr.dd.month,
        data: curM,
      });
    }
    curM.push(cr);
  }
  return blogByDate;
};

export const BlogIndex = () => {
  const data = useContent();
  const faLocale = new Intl.DateTimeFormat("fa-IR", {
    month: 'long',
    year: 'numeric',
  });
  const blogs = indexMarkdownFolder(data, 'blogs').map((x)=>({
    ...x,
    dd: (()=>{
      let month, year;
      faLocale.formatToParts(new Date(x.date)).forEach((y)=>{
        if (y.type === 'month') month = y.value;
        if (y.type === 'year') year = y.value;
      });
      return { month, year };
    })(),
  }));
  blogs.sort((x, y) => x.date < y.date ? 1 : -1);
  const blogByDate = groupByDate(blogs);
  return ( <Layout>
    <SEO title="اخبار"/>
    <h1>اخبار</h1>
    <p>
      در این صفحه اخبار مهم مرتبط با داده های عمومی در سراسر جهان و 
      همچنین اخبار مرتبط با جمعیت داده های عمومی قرار دارد.
    </p>
    {blogByDate && blogByDate.map && blogByDate.map((a)=>(
      <div key={a.year}>
        <h2>سال {a.year}</h2>
        {a.data && a.data.map((b)=>(
          <div key={b.month}>
            <h4>{b.month}</h4>
            <ul>
              {f(b.data)}
            </ul>
          </div>
        ))}
      </div>
    ))}
  </Layout> );
};

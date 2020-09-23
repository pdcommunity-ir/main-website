import React from "react";
import { Helmet } from "react-helmet";

export const SEO = ({ description, lang, meta = [], title }) => {
  
  const metaDescription = description || 'salam';

  return (
    <Helmet
      htmlAttributes={{
        lang: 'fa',
      }}
      title={`${title} | جمعیت داده های عمومی`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
};

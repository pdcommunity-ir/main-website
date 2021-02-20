const removeMD = (x)=>{
  if (x.endsWith('.md')) {
    return x.slice(0, -3) + "/";
  }
};

export const urls = (data) => [
  "/", "/about/", "/faq/", "/articles/", "/blogs/", "/membership/", "/intro/",
  "/companies/",
  ...Object.keys(data).filter((x)=>x.startsWith('/articles/')).map(removeMD),
  ...Object.keys(data).filter((x)=>x.startsWith('/blogs/')).map(removeMD),
  ...Object.keys(data).filter((x)=>x.startsWith('/projects/')).map(removeMD),
  ...Object.keys(data).filter((x)=>x.startsWith('/companies/')).map(removeMD),
  ...Object.keys(data).filter((x)=>x.startsWith('/licenses/markdown/'))
    .map(removeMD).map((x)=>`/license/${x.slice('/licenses/markdown/'.length)}`),
  ...data['/faq.yml'].questions.map((x)=>`/faq/${x.id}/`),
];

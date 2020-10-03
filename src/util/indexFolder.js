export const indexMarkdownFolder = (db, folderName) => {
  return Object.keys(db)
    .filter((x) => x.startsWith(`/${folderName}/`))
    .map((x) => {
      if (x.endsWith('.md')) {
        return {
          url: x.slice(0, -3) + '/',
          ...db[x].frontmatter,
        };
      }
      return {
        url: '/404/',
        title: 'broooooooooooooooooooooooooken',
      };
    });
};

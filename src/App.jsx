import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ArticleIndex } from "./pages/article/ArticleIndex.jsx";
import { ArticlePage } from "./pages/article/ArticlePage.jsx";
import { BlogPage } from "./pages/blog/BlogPage.jsx";
import { FAQ } from "./pages/FAQ.jsx";
import { About } from "./pages/About.jsx";
import { IndexPage } from "./pages/IndexPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";
import { withRouter } from 'react-router-dom';
import { ProjectPage } from "./pages/project/ProjectPage.jsx";
import { BlogIndex } from "./pages/blog/BlogIndex.jsx";
import { LicensePage } from "./pages/license/LicensePage.jsx";
import { Membership } from "./pages/Membership.jsx";

const ScrollToTop = withRouter(({ history }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    }
  }, []);

  return (null);
});

export const App = () => (
  <>
    <ScrollToTop/>
    <Switch>
      <Route path="/:url*" exact strict render={props => <Redirect to={`${props.location.pathname}/`}/>}/>
      <Route path="/" exact>
        <IndexPage/>
      </Route>
      <Route path="/about">
        <About/>
      </Route>
      <Route path="/faq/:id">
        <FAQ/>
      </Route>
      <Route path="/faq/">
        <FAQ/>
      </Route>
      <Route path="/membership">
        <Membership/>
      </Route>
      <Route path="/projects/:id">
        <ProjectPage/>
      </Route>
      <Route path="/license/:id">
        <LicensePage/>
      </Route>
      <Route path="/blogs/:id">
        <BlogPage/>
      </Route>
      <Route path="/blogs">
        <BlogIndex/>
      </Route>
      <Route path="/articles/:id">
        <ArticlePage/>
      </Route>
      <Route path="/articles">
        <ArticleIndex/>
      </Route>
      <Route path="*">
        <NotFoundPage/>
      </Route>
    </Switch>
  </>
);

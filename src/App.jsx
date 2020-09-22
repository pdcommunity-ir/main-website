import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ArticleIndex } from "./pages/ArticleIndex.jsx";
import { ArticlePage } from "./pages/ArticlePage.jsx";
import { FAQ } from "./pages/FAQ.jsx";
import { IndexPage } from "./pages/IndexPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";

export const App = () => (
  <Switch>
    <Route path="/:url*" exact strict render={props => <Redirect to={`${props.location.pathname}/`}/>}/>
    <Route path="/" exact>
      <IndexPage/>
    </Route>
    <Route path="/faq">
      <FAQ/>
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
);

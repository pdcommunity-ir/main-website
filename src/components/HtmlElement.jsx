import React from "react";
import { useHistory } from "react-router-dom";

export const HtmlElement = ({ content, ...props }) => {
  const history = useHistory();
  const handleLink = (e) => {
    const targetLink = e.target.closest('a');
    if(!targetLink) return;
    if (targetLink.host !== window.location.host) return;
    if (targetLink.pathname !== window.location.pathname) {
      e.preventDefault();
      history.push(targetLink.pathname);
      return;
    }
  };
  return (
    <div {...props} onClick={handleLink} dangerouslySetInnerHTML={{ __html: content }}/>
  );
};

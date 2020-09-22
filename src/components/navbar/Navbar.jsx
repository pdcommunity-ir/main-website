import { Link } from "react-router-dom";
import React, { useState } from "react"
import { Navbar as RBN, Nav, NavDropdown, Fade } from "react-bootstrap";
import styles from "./navbar.module.css";
import { useSSRContent } from "../../useSSRContent";

const NItem = ({ to, label, fg }) => (
  <Nav.Link style={{ color: fg }} as={Link} className={styles.navbutton} to={to}>
    {label}
  </Nav.Link>
);

const LangButton = ({ to, label, bg, fg }) => {
  const [isOn, setOn] = useState(false);
  return (
    <button 
      className={styles.langButton}
      onClick={()=>setOn(!isOn)}
      style={{ backgroundColor: bg, color: fg }}
    >
      {label}
      <div className={`${styles.langPage} ${(isOn ? '' : styles.hidden)}`}>
        <a href="https://en.pdcommunity.ir/">
          English
        </a>
        <br/>
        <a href="https://pdcommunity.ir/">
          فارسی
        </a>
      </div>
    </button>
  );
};

export const Navbar = ({ bg = "#f44333", fg = "#fff" }) => {
  const data = useSSRContent('/navbar.yml').buttons;
  return (
    <RBN 
      className={styles.navbar} variant="dark" fixed="top" expand="md"
      style={{ backgroundColor: bg }}
    >
      <RBN.Toggle aria-controls="responsive-navbar-nav" />
      <RBN.Collapse id="responsive-navbar-nav"><Nav>
        {data.map(x => {
          if (x.type === 'dropdown') {
            return (
              <NavDropdown 
                style={{ color: fg }}
                key={x.label} className={styles.navbutton} title={x.label}
              >
                {x.items.map((y) => {
                  return (
                    <NavDropdown.Item
                      key={y.label} href={y.link} target="_blank"
                    >{y.label}</NavDropdown.Item>
                  );
                })}
              </NavDropdown>
            );
          }
          return <NItem fg={fg} key={x.label} to={x.link} label={x.label}/>;
        })}
      </Nav></RBN.Collapse>
      <LangButton to="/" bg={bg} fg={fg} label="فارسی"/>
    </RBN>
  );
};

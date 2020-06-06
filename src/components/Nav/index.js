import React, { useState } from "react";
import classNames from "classnames";

import "./index.css";

const links = [
  { name: "About Us", link: "#about-us" },
  { name: "Our Team", link: "#our-team" },
  { name: "Gallery", link: "#gallery" },
  { name: "Events", link: "#events" },
  { name: "Recruitment", link: "#recruitment" },
];

const Nav = () => {
  const [isMobileActive, setMobileActive] = useState(false);

  return (
    <nav className="nav">
      <a href="/" className="logo">
        <div className="logo__graphic" alt="logo"></div>
      </a>

      <div
        className="sandwich"
        onClick={() => setMobileActive(!isMobileActive)}
      >
        <div className="sandwich__line"></div>
        <div className="sandwich__line"></div>
        <div className="sandwich__line"></div>
      </div>

      <div
        className={classNames({
          links: true,
          "links--white": true,
          "links--mobile-active": isMobileActive,
        })}
      >
        {links.map(({ name, link }) => (
          <a
            className="links__link"
            href={link}
            onClick={() => setMobileActive(false)}
          >
            {name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export { Nav };

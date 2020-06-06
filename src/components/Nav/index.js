import React, { useState } from "react";
import classNames from "classnames";

import "./Nav.css";

const Nav = () => {
  const [isMobileActive, setMobileActive] = useState(false);
  const links = [
    { name: "About Us", link: "#about-us" },
    { name: "Our Team", link: "#our-team" },
    { name: "Gallery", link: "#gallery" },
    { name: "Events", link: "#events" },
    { name: "Recruitment", link: "#recruitment" },
  ];

  return (
    <nav className="nav">
      <img className="logo" alt="logo" src={"/logo.svg"} />

      <div
        className="sandwich"
        onClick={() => setMobileActive(!isMobileActive)}
      >
        <div className="sandwich__line"></div>
        <div className="sandwich__line"></div>
        <div className="sandwich__line"></div>
      </div>

      <div
        className={
          "links--white links " +
          classNames({
            "links--mobile-active": isMobileActive,
          })
        }
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

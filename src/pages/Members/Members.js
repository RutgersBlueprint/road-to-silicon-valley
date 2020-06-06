import React, { useEffect, useState } from "react";
import Client from "../../client";
import { motion } from "framer-motion";
import "./Members.css";

const Profile = ({ src, name = "Name", position = "position" }) => {
  return (
    <motion.div
      className="profile"
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 24 }}
    >
      <div className="profile__picture"></div>
      <div className="profile__name">{name}</div>
      <div className="profile__text">{position}</div>
    </motion.div>
  );
};

const Tabs = ({ data = {} }) => {
  const sections = Object.keys(data);
  const [activeSection, setActiveSection] = useState(sections[0]);

  return (
    <div>
      <div className="tabs">
        {sections.map((section) => {
          const isActive = section === activeSection;
          return (
            <div
              className="tabs__tab"
              style={{
                color: isActive ? "white" : "black",
                backgroundColor: isActive ? "#9E2020" : "transparent",
                boxShadow: isActive
                  ? "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)"
                  : "none",
              }}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </div>
          );
        })}
      </div>
      <div className="profiles">
        {data[activeSection].map(
          ({ name = "Name", position = "position" }, i) => (
            <Profile key={activeSection + i} name={name} position={position} />
          )
        )}
      </div>
    </div>
  );
};

const Members = ({ ...props }) => {
  const data = {
    "Executive Board": [{}, {}, {}, {}, {}, {}, {}, {}, {}],
    "Meet Our Members": [{}, {}, {}],
    "Cohort 1 Members": [{}],
  };

  return (
    <section className="members" {...props}>
      <div className="members__inner">
        <h2>Meet our Members</h2>
        <Tabs data={data} />
      </div>
    </section>
  );
};

export { Members };

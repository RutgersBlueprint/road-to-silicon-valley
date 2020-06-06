import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import "./index.css";
import _ from "lodash";
import { AppContext } from "../../contexts";

const Profile = ({ src = "", name = "Name", position = "position" }) => {
  return (
    <motion.div
      className="profile"
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 24 }}
    >
      <div className="profile__picture">
        <img alt={name} src={src} />
      </div>
      <div className="profile__name">{name}</div>
      <div className="profile__text">{position}</div>
    </motion.div>
  );
};

const Tabs = ({ data = {} }) => {
  const sections = Object.keys(data);
  const [activeSection, setActiveSection] = useState(sections?.[0]);

  useEffect(() => {
    const sections = Object.keys(data);
    setActiveSection(sections?.[0]);
  }, [data]);

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
        {data?.[activeSection]?.map(
          (
            {
              member_name: name = "Name",
              member_position: position = "position",
              member_profile_picture: { url },
            },
            i
          ) => (
            <Profile
              key={activeSection + i}
              name={name}
              position={position}
              src={url}
            />
          )
        )}
      </div>
    </div>
  );
};

const Members = ({ ...props }) => {
  const { data } = useContext(AppContext);

  return (
    <section className="members" {...props}>
      <div className="members__inner">
        <h2>Meet our Members</h2>
        <Tabs
          data={_.groupBy(data.member_group, function (item) {
            return item.member_group;
          })}
        />
      </div>
    </section>
  );
};

export { Members };

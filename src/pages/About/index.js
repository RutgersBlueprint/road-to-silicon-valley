import React, { useContext } from "react";
import { AppContext } from "../../contexts";
import "./index.css";

const About = ({ id, src = "", title = "", subheader = "" }) => (
  <section className="about" id={id}>
    <div className="about__inner">
      <img className="about__image" alt="about" src={src} />
      <div>
        <h2>{title}</h2>
        <p>{subheader}</p>
      </div>
    </div>
  </section>
);

const AboutContainer = ({ id }) => {
  const { data } = useContext(AppContext);

  return (
    data && (
      <About
        id={id}
        src={data["what-we-do-image"]?.url}
        title={data["what-we-do-title"]}
        subheader={data["what-we-do-text"]}
      ></About>
    )
  );
};

export { AboutContainer as About };

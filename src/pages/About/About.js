import React, { useEffect } from "react";
import Client from "../../client";
import "./About.css";

const About = ({ id = "", src = "", title = "", subheader = "" }) => (
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
  const [{ title, subheader, src }, setData] = React.useState({
    title: "",
    subheader: "",
    src: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await Client.query();

      if (response) {
        const {
          results: [{ data }],
        } = response;

        console.log(data);

        setData({
          title: data["what-we-do-title"],
          subheader: data["what-we-do-text"],
          src: data["what-we-do-image"].url,
        });
      }
    };

    fetchData();
  }, []);

  return <About id={id} src={src} title={title} subheader={subheader}></About>;
};

export { AboutContainer as About };

import React, { useEffect } from "react";
import Client from "../../client";
import "./Story.css";

const Story = ({ id, statistics, text }) => {
  return (
    <section id={id} className="story">
      <div className="story__header-group">
        <h3 className="story__header">Our Story</h3>
        <p className="story__text">{text}</p>
      </div>

      <div className="stats">
        {statistics.map((statistic) => (
          <div className="stat">
            <div className="stat__value">{statistic["statistic-value"]}</div>
            <div className="stat__label">{statistic["statistic-label"]}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const StoryContianer = ({ id }) => {
  const [{ statistics, text }, setData] = React.useState({
    statistics: [],
    text: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await Client.query();

      if (response) {
        const {
          results: [{ data }],
        } = response;

        setData({
          statistics: data["statistics"],
          text: data["our-story-text"],
        });
      }
    };

    fetchData();
  }, []);

  return <Story id={id} statistics={statistics} text={text} />;
};

export { StoryContianer as Story };

import React, { useContext } from "react";

import "./index.css";
import { AppContext } from "../../contexts";

const Story = ({ id, statistics = [], text = "" }) => {
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
  const { data } = useContext(AppContext);

  return (
    <Story
      id={id}
      statistics={data["statistics"]}
      text={data["our-story-text"]}
    />
  );
};

export { StoryContianer as Story };

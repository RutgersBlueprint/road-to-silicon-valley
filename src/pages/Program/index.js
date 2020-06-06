import React, { useEffect } from "react";
import "./index.css";
import "../../index.css";
import { AppContext } from "../../contexts";

const Program = ({ id, items = [] }) => {
  return (
    <section className="program" id={id}>
      <div className="program__inner">
        <h2>Program Elements</h2>

        <div className="program__events">
          {items.map((item, index) => (
            <div className="program__event">
              <div className="program__event__wrapper">
                <div className="program__event__inner">
                  <div className="program__event__banner" index={index + 1}>
                    {item["program-element-title"]}
                  </div>
                  <div className="program__event__text">
                    <ul>
                      {item["program-elements-items"].map(({ text }) => (
                        <li>{text}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProgramContainer = ({ id }) => {
  const { data } = React.useContext(AppContext);

  return <Program id={id} items={data?.["program-elements"]} />;
};

export { ProgramContainer as Program };

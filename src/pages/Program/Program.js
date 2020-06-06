import React, { useEffect } from "react";
import Client from "../../client";
import "./Program.css";
import "../../index.css";

const Program = ({ id, items }) => {
  return (
    <section className="program" id={id}>
      <div className="program__inner">
        <h2>Program Elements</h2>

        <div className="program__events">
          {items.map((item, index) => (
            <div className="event">
              <div className="event__wrapper">
                <div className="event__inner">
                  <div className="event__banner" index={index + 1}>
                    {item["program-element-title"]}
                  </div>
                  <div className="event__text">
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
  const [items, setItems] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await Client.query();

      if (response) {
        const {
          results: [{ data }],
        } = response;

        setItems(data["program-elements"]);
      }
    };

    fetchData();
  }, []);

  return <Program id={id} items={items} />;
};

export { ProgramContainer as Program };

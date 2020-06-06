import React, { useEffect } from "react";
import styled from "styled-components";
import Client from "../../client";
import "./Timeline.css";

const Timeline = ({ id, events }) => {
  return (
    <section className="timeline" id={id}>
      <div className="timeline__inner">
        <h2 className="timeline__header">Recruitment Timeline</h2>

        <div className="timeline__events">
          {events.map((event, i) => (
            <div className="timeline__events__event">
              <div className="timeline__events__event__header">
                <div className="timeline__events__event__num">{i + 1}</div>
                <div className="timeline__events__event__name">
                  {event["recruitment-event-title"]}
                </div>
              </div>
              <div className="timeline__events__event_text">
                {event["recruitment-event-desc"]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineContainer = ({ id }) => {
  const [events, setEvents] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await Client.query();

      if (response) {
        const {
          results: [{ data }],
        } = response;

        console.log(data);

        setEvents(data["recruitment-event"]);
      }
    };

    fetchData();
  }, []);

  return <Timeline id={id} events={events} />;
};

export { TimelineContainer as Timeline };

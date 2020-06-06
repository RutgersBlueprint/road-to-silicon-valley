import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../contexts";
import "./index.css";

const propsToQuery = (props) => {
  return Object.entries(props)
    .map((prop) => prop.join("="))
    .join("&");
};

const buildUrl = (apiKey, calendarId, maxResults = 3) => {
  const props = {
    maxResults,
    key: apiKey,
    timeMin: new Date().toISOString(),
  };

  return encodeURI(
    "https://www.googleapis.com/calendar/v3/calendars/" +
      calendarId +
      "/events?" +
      propsToQuery(props)
  );
};

const Event = ({ event }) => {
  const getMonth = (date) =>
    [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "july",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ][date.getMonth()];

  const getHours = (date) =>
    (date.getHours() % 12) + (date.getHours % 12 === 0 ? 12 : 0);

  const getTimeOfDay = (date) => (date.getHours() < 12 ? "am" : "pm");

  const startTime = new Date(event?.start?.dateTime);
  const startHour = getHours(startTime);
  const startTimeOfDay = getTimeOfDay(startTime);

  const endTime = new Date(event?.end?.dateTime);
  const endHour = getHours(endTime);
  const endTimeOfDay = getTimeOfDay(endTime);

  const title = event.summary;
  const location = event.location;
  const month = getMonth(startTime);
  const day = startTime.getDate() + 1;

  return (
    <section className="event">
      <div className="event__date">
        <div className="event__month">{month}</div>
        <div className="event__day">{String(day).padStart(2, "0")}</div>
      </div>

      <div className="event__details">
        <div className="event__title">{title}</div>
        <div className="event__detail">
          {startHour} {startTimeOfDay !== endTimeOfDay && startTimeOfDay} -{" "}
          {endHour} {startTimeOfDay} {location && ", " + location}
        </div>
      </div>
    </section>
  );
};

const Events = ({ id, src = "", events = [], calendarId = "" }) => {
  const { items = [] } = events;

  return (
    <section className="events" id={id}>
      <div className="events__inner">
        <div>
          <h2>Upcoming Events</h2>
          <div className="events__list">
            {items.map((event) => (
              <Event event={event} />
            ))}
          </div>
        </div>

        <iframe
          src={encodeURI(
            `https://calendar.google.com/calendar/embed?src=${calendarId}&ctz=America%2FNew_York`
          )}
          width="800"
          height="600"
          frameborder="0"
          scrolling="no"
          title="Test"
        ></iframe>
      </div>
    </section>
  );
};

const EventsContainer = ({ id }) => {
  const { data } = useContext(AppContext);
  const [events, setEvents] = useState();

  useEffect(() => {
    if (data !== null) {
      const fetchData = async () => {
        const response = await fetch(buildUrl(data.api_key, data.calendar_id));
        setEvents(await response.json());
      };

      fetchData();
    }
  }, [data]);

  return (
    data && (
      <Events
        id={id}
        src={data["what-we-do-image"]?.url}
        events={events}
        calendarId={data.calendar_id}
      />
    )
  );
};

export { EventsContainer as Events };

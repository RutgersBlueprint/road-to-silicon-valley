import React, { useState, useEffect } from "react";

import Client from "./client";

import { Nav } from "./components/Nav";
import { Jumbo } from "./pages/Jumbo";
import { About } from "./pages/About";
import { Story } from "./pages/Story";

import { Timeline } from "./pages/Timeline/Timeline";
import { Program } from "./pages/Program";
import { Members } from "./pages/Members";
import { Footer } from "./components/Footer";
import { Gallery } from "./pages/Gallery/Gallery";
import { AppContext } from "./contexts";
import { Events } from "./pages/Events";

const App = () => {
  return (
    <>
      <Nav />
      <Jumbo />
      <About id="about-us" />
      <Story />
      <Program />
      <Members id="our-team" />
      <Gallery id="gallery" />
      <Events id="events" />
      <Timeline id="recruitment" />
      <Footer />
    </>
  );
};

const AppContainer = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await Client.query();

      if (response) {
        const {
          results: [{ data }],
        } = response;
        setData(data);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ data }}>
      <App />
    </AppContext.Provider>
  );
};

export default AppContainer;

import React, { useEffect } from "react";
import Client from "../../client";
import Prismic from "prismic-javascript";

import "../../index.css";
import "./Jumbo.css";
import { Motif } from "../../components/Motif";

const Jumbo = ({ title = "", subheader = "", callToAction = "" }) => (
  <div className="jumbo">
    {/* <Motif /> */}
    <div className="jumbo__inner">
      <h1 className="jumbo__header">{title}</h1>
      <h4 className="jumbo__subheader">{subheader}</h4>

      <button className="jumbo-button u-center">{callToAction}</button>
    </div>
  </div>
);

const JumboContainer = () => {
  const [data, setData] = React.useState({
    title: "",
    subheader: "",
    callToAction: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await Client.query();

      if (response) {
        const {
          results: [{ data }],
        } = response;

        setData({
          title: data["jumbo-header"],
          subheader: data["jumbo-subheader"],
          callToAction: data["jumbo-cta"],
        });
      }
    };

    fetchData();
  }, []);

  return (
    <Jumbo
      title={data.title}
      subheader={data.subheader}
      callToAction={data.callToAction}
    ></Jumbo>
  );
};

export { JumboContainer as Jumbo };

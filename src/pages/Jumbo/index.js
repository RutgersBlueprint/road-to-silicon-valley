import React from "react";

import "../../index.css";
import "./index.css";
import { Motif } from "../../components/Motif";
import { AppContext } from "../../contexts";

const Jumbo = ({
  title = "Road to Silicon V/Alley",
  subheader = "Empowering Rutgers Business School students to create pathways to leadership opportunities at innovative companies and pursue entrepreneurial ambitions.",
  callToAction = "Learn More",
}) => (
  <div className="jumbo">
    <Motif />

    <div className="jumbo__inner">
      <h1 className="jumbo__header">{title}</h1>
      <h4 className="jumbo__subheader">{subheader}</h4>

      <a href="#about-us" className="jumbo-button u-center">
        {callToAction}
      </a>
    </div>
  </div>
);

const JumboContainer = () => {
  const { data } = React.useContext(AppContext);

  return (
    data && (
      <Jumbo
        title={data["jumbo-header"]}
        subheader={data["jumbo-subheader"]}
        callToAction={data["jumbo-cta"]}
      ></Jumbo>
    )
  );
};

export { JumboContainer as Jumbo };

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Gallery.css";
import classNames from "classnames";
import Client from "../../client";
import Carousel, { Dots } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

const Gallery = ({ ...props }) => {
  const [galleryIndex, setIndex] = useState(0);
  const [items, setItems] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await Client.query();

      if (response) {
        const {
          results: [{ data }],
        } = response;

        setItems(data["gallery-image-group"]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((galleryIndex + 1) % items.length);
    }, 10_000);

    return () => {
      clearTimeout(timeout);
    };
  }, [galleryIndex, items]);

  const onChange = (value) => {
    setIndex(value);
  };

  return (
    <section className="gallery" {...props}>
      <div className="gallery__images">
        <Carousel value={galleryIndex} onChange={onChange}>
          {items.map((item) => (
            <img
              alt="title"
              className="gallery__image"
              src={item?.["gallery-image"].url}
            />
          ))}
        </Carousel>
      </div>
      <div className="aside">
        <div className="dots">
          {items.map((_, index) => (
            <div
              onClick={() => {
                setIndex(index);
              }}
              className={
                "dots__dot " +
                classNames({
                  "dots__dot--active": galleryIndex === index,
                })
              }
            ></div>
          ))}
        </div>
        <h2 className="aside__header">See what we’ve been up to!</h2>
      </div>
    </section>
  );
};

export { Gallery };

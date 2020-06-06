import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Gallery.css";
import classNames from "classnames";
import Client from "../../client";

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

  return (
    <section className="gallery" {...props}>
      <div className="gallery__images">
        <AnimatePresence>
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="gallery__image"
            alt="slide"
            key={items[galleryIndex]}
            src={items[galleryIndex]?.["gallery-image"].url}
          />
        </AnimatePresence>
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

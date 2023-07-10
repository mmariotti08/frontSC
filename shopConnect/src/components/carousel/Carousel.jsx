import React, { useState, useEffect } from "react";
import img1 from "../img/img1.jpg";
import img2 from "../img/img2.jpg";
import img3 from "../img/img3.jpg";
import img4 from "../img/img4.jpg";
import img5 from "../img/img5.jpg";

import styles from "./Carousel.module.css";

export default function Carousel({ autoPlay = true  }) {
  const images = [img1, img2, img3,img4,img5];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    if (autoPlay  ) {
      const interval = setInterval(() => {
        selectNewImage(selectedIndex, images);
      }, 4000);
      return () => clearInterval(interval);
    }
  });

  const selectNewImage = (index, next = true) => {
    setLoaded(false);
    setTimeout(() => {
      const condition = next ? selectedIndex < images.length - 1 : selectedIndex > 0;
      const nextIndex = next ? (condition ? selectedIndex + 1 : 0) : (!condition ? selectedIndex - 1 : images.length - 1);
      setSelectedImage(images[nextIndex]);
      setSelectedIndex(nextIndex);
      setLoaded(true);
    }, 500);
  };

  const previous = () => {
    selectNewImage(selectedIndex, false);
  };

  const next = () => {
    selectNewImage(selectedIndex);
  };

  return (
    <div className={styles.carousel}>
      <img
        src={selectedImage}
        alt="Gentleman"
        className={`${styles.carouselImg} ${loaded ? styles.loaded : ""}`}
        onLoad={() => setLoaded(true)}
      />

      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={previous}>
          {"<"}
        </button>
        <button className={styles.button} onClick={next}>
          {">"}
        </button>
      </div>

    </div>
  );
}

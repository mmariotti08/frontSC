import React, { useState, useEffect } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import styles from "./Carousel.module.css";
import img1 from "./img/yGvjpNtwOzetvVggs23G4ZySMt2CpShLMPH4Fdlu.jpg";
import img2 from "./img/cp5AMPjg3SLqkuCzT36qBiViiLpanaEpR38KyJlV.jpg";
import img3 from "./img/S6oFojiNXYQCBvhwqU58fvdhTUWJaju75Awp5HdY.jpg"
import img4 from "./img/zvRm5yJ3hJUA49iCN3RfrRYwhxfcGC4ierXWnOnY.jpg"

export default function Carousel({ autoPlay = true  }) {
	const images = [img1, img2, img3, img4];

	const [selectedIndex, setSelectedIndex] = useState(0);
	const [selectedImage, setSelectedImage] = useState(images[0]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (autoPlay  ) {
			const interval = setInterval(() => {
				selectNewImage(selectedIndex, images);
			}, 4000);
			return () => clearInterval(interval);
		};
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
			<div className={styles.container_buttons}>
				<button className={styles.button} onClick={previous}>
					<BsArrowLeftCircleFill />
				</button>
				<button className={styles.button} onClick={next}>
					<BsArrowRightCircleFill />
				</button>
			</div>
		</div>
	);
};

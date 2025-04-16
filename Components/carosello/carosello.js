"use client";
import React, {useEffect, useState} from 'react';
import classes from "@/Components/carosello/carosello.module.css";

const images = [
    { src: "/Azienda.webp", alt: "Immagine Azienda" },
    { src: "/Servizi.webp", alt: "Immagine Servizi" },
    { src: "/Azienda.webp", alt: "Immagine Azienda" }
];

export default function HomeCarousel() {
    const [current, setCurrent] = useState(0);
    const length = images.length;

    const nextSlide = () => {
        setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
    };

    useEffect(() => {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }, [current]);

    if (!Array.isArray(images) || images.length <= 0) return null;

    return (
        <div className={classes.carousel}>
            <div className={classes.slider} style={{ transform: `translateX(-${current * 100}%)` }}>
                {images.map((image, index) => (
                    <div key={index} className={classes.slide}>
                        <img
                            src={image.src}
                            alt={image.alt}
                            className={classes.image}
                        />
                    </div>
                ))}
            </div>
            <button className={classes.prev} onClick={prevSlide}>
                &#10094;
            </button>
            <button className={classes.next} onClick={nextSlide}>
                &#10095;
            </button>
            <div className={classes.dots}>
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`${classes.dot} ${current === index ? classes.activeDot : ''}`}
                        onClick={() => setCurrent(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
}

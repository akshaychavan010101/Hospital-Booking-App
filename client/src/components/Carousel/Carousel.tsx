import { useState, useEffect, useRef } from "react";
import styles from "./Carousel.module.css";

type Slide = {
  id: number;
  imgUrl: string;
  altText: string;
};

const slides: Slide[] = [
  {
    id: 1,
    imgUrl: "https://via.placeholder.com/400x200/abcdef",
    altText: "Slide 1"
  },
  {
    id: 2,
    imgUrl: "https://via.placeholder.com/400x200/fedcba",
    altText: "Slide 2"
  },
  {
    id: 3,
    imgUrl: "https://via.placeholder.com/400x200/abcdef",
    altText: "Slide 3"
  },
  {
    id: 4,
    imgUrl: "https://via.placeholder.com/400x200/fedcba",
    altText: "Slide 4"
  }
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slideWidth = slideRef.current?.children[0]?.clientWidth;
    if (slideWidth) {
      setTranslateValue(-slideWidth * currentSlide);
    }
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  return (
    <div className={styles.carousel}>
      <div
        className="carousel__wrapper"
        style={{ transform: `translateX(${translateValue}px)` }}
        ref={slideRef}
      >
        {slides.map((slide) => (
          <div className="carousel__slide" key={slide.id}>
            <img src={slide.imgUrl} alt={slide.altText} />
          </div>
        ))}
      </div>

      <div className="carousel__buttons">
        <button onClick={prevSlide}>&lt;</button>
        <button onClick={nextSlide}>&gt;</button>
      </div>
    </div>
  );
};

export default Carousel;

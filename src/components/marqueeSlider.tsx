import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SliderProps {
  slides: string[];
  length: number;
}

const MarqueeSlider: React.FC<SliderProps> = ({ slides, length }) => {
  const settings = {
    infinite: true,
    speed: 4000,
    slidesToShow: length,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: false,
    swipeToSlide: true,
    touchMove: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 5.2,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 4.2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 4.1,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 3.1,
        },
      },
    ],
  };

  const repeatedSlides = [...slides, ...slides, ...slides, ...slides];

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <Slider {...settings}>
        {repeatedSlides.map((slide, index) => (
          <div key={index}>
            <img src={slide} alt={`Slide ${index}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MarqueeSlider;

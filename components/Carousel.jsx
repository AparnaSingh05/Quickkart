import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Carousel.css";

const images = [
  "/images/model1.jpg",
  "/images/model2.jpg",
  "/images/model3.jpg",
  "/images/model4.jpg"
];

// Animated Text for Typing Effect
const animatedText = "Welcome to QuickKart!";

const Carousel = () => {
  const [text, setText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      if (isDeleting) {
        if (charIndex > 0) {
          setText((prev) => prev.substring(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
          setSpeed(50);
        } else {
          setIsDeleting(false);
          setSpeed(500);
        }
      } else {
        if (charIndex < animatedText.length) {
          setText((prev) => prev + animatedText.charAt(charIndex));
          setCharIndex((prev) => prev + 1);
          setSpeed(100);
        } else {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, speed]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    cssEase: "linear",
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map((img, idx) => (
          <div key={idx} className="carousel-slide">
            <img src={img} alt={`Model ${idx + 1}`} className="carousel-image" />
          </div>
        ))}
      </Slider>
      <div className="carousel-overlay">
        <h1 className="typewriter-text">{text}</h1>
        <p className="subtitle">Shop with Confidence!</p>
      </div>
    </div>
  );
};

export default Carousel;

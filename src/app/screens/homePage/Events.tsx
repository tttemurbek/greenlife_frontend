import { Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { plans } from "../../../lib/data/plans";
import EventSeatIcon from "@mui/icons-material/EventSeat";

import React, { useState, useEffect } from "react";
import "../../../css/customerTestimonials.css";

const testimonials = [
  {
    name: "John Doe",
    text: "This product is fantastic! It really helped me improve my productivity.",
    location: "New York, USA",
    image: "https://jetuk.org/wp-content/uploads/2014/07/testimonial-img-1.jpg",
  },
  {
    name: "Jane Smith",
    text: "I love this service. The team is super responsive and helpful!",
    location: "London, UK",
    image:
      "https://i.pinimg.com/enabled/564x/2a/26/df/2a26df12b8fab576a93f244212cb6673.jpg",
  },
  {
    name: "Carlos Gomez",
    text: "Highly recommended. Excellent quality and great customer support!",
    location: "Madrid, Spain",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/8b/Cristiano_Ronaldo_WC2022_-_01_%28cropped%29.jpg",
  },
  {
    name: "Aisha Khan",
    text: "Fantastic experience! I will definitely return for future purchases.",
    location: "Dubai, UAE",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOsje0H31W2ZuUZA8veGqftHwm3Wx7DHS_JA&s",
  },
  {
    name: "Samantha Lee",
    text: "A seamless process from start to finish, very happy with the results.",
    location: "Sydney, Australia",
    image:
      "https://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2012/12/9/1355055907038/e0428d50-868a-4840-af87-b94579a94da4-460.jpeg",
  },
  {
    name: "Tom Hardy",
    text: "The customer support team was extremely helpful and attentive.",
    location: "Toronto, Canada",
    image:
      "https://images.theconversation.com/files/598062/original/file-20240603-23-s3su5a.jpg?ixlib=rb-4.1.0&rect=5%2C5%2C3988%2C3077&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip",
  },
  {
    name: "Emily Zhang",
    text: "The service exceeded my expectations, highly recommend!",
    location: "Shanghai, China",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu35Qp1dcIv3yQtTfzqg42rSWvzDgUevSSoMHY9X3ilPs8LreitpbbmXmNPjovQY_baUc&usqp=CAU",
  },
];

const CustomerTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalTime = 3000; // Set time interval for auto swipe (in milliseconds)

  // Automatic swipe using useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, intervalTime);

    return () => clearInterval(interval); // Cleanup
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="testimonial-wrapper">
      <div className="testimonial-text-header">Testimonial</div>
      <div className="testimonial-carousel">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`testimonial-item ${
              index === currentIndex ? "active" : ""
            }`}
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="testimonial-image"
            />
            <p className="testimonial-text">"{testimonial.text}"</p>
            <h4 className="testimonial-name">{testimonial.name}</h4>
            <span className="testimonial-location">{testimonial.location}</span>
          </div>
        ))}
      </div>
      {/* <div className="carousel-buttons">
        <button onClick={handlePrev} className="prev-btn">
          Prev
        </button>
        <button onClick={handleNext} className="next-btn">
          Next
        </button>
      </div> */}
    </div>
  );
};

export default CustomerTestimonials;

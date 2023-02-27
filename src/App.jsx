import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
function App() {
  const [images, setImages] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const get_images = async (startDate, endDate) => {
    const url_data = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`;
    const response = await axios.get(url_data);

    return response.data;
  };
  useEffect(() => {
    async function fetchData() {
      const data = await get_images("2021-12-01", "2023-01-01");
      setImages(data);
      if (images.includes("video") || images.includes("youtube")) {
        console.log("Have a video here!");
      }
    }
    fetchData();
  }, []);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <div className="card_image">
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={true}
          showDots={true}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={4000}
          keyBoardControl={true}
          customTransition="all .5 linear"
          transitionDuration={500}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-10-px"
        >
          {images.map((slide, index) => (
            <div key={index}>
              <img
                src={slide.url}
                alt={slide.title}
                width="700px"
                height="600px"
              />
              <h2>{slide.title}</h2>
              <p>
                <i>
                  <a
                    href={slide.url}
                    style={{
                      color: "#3286D3",
                      textDecoration: "none",
                      paddingTop: "2rem",
                    }}
                  >
                    See all
                  </a>
                  <br />
                  {slide.date}
                </i>
              </p>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default App;

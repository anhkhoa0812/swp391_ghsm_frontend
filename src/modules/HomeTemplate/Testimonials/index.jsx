import qoutes from "../../../assets/images/testimonials/quotes.png";
import tem01 from "../../../assets/images/testimonials/01.png";

import tem03 from "../../../assets/images/testimonials/03.png";
import tem04 from "../../../assets/images/testimonials/04.png";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/pagination";

export default function Testimonials() {
  return (
    <div className="rts-testimonials-area rts-section-gap">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="title-area-center">
              <h2 className="title text-center">
                Reviews from Our Patients <br />
              </h2>
            </div>
          </div>
        </div>
        <div className="row mt--0 g-5">
          <div className="col-lg-12">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={3}
              navigation
              wrapperClass="swiper-wrapper"
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
              loop={true}
            >
              <SwiperSlide>
                <div className="single-testimonials-style">
                  <div className="quots">
                    <img src={qoutes} alt="testimonails" />
                  </div>
                  <p className="disc">
                    I am very satisfied with the healthcare services here. The
                    doctors explain everything clearly, which makes me feel at
                    ease.
                  </p>
                  <div className="author-area">
                    <a href="#" className="img">
                      <img src={tem01} alt="testiminials" />
                    </a>
                    <div className="info">
                      <h6 className="name">David Patel</h6>
                      <div className="stars-area">
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="single-testimonials-style">
                  <div className="quots">
                    <img src={qoutes} alt="testimonails" />
                  </div>
                  <p className="disc">
                    The medical team is professional and caring. Every time I
                    visit, I feel welcomed and well taken care of. They always
                    ensure my comfort.
                  </p>
                  <div className="author-area">
                    <a href="#" className="img">
                      <img src={tem03} alt="testiminials" />
                    </a>
                    <div className="info">
                      <h6 className="name">John Doe</h6>
                      <div className="stars-area">
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="single-testimonials-style">
                  <div className="quots">
                    <img src={qoutes} alt="testimonails" />
                  </div>
                  <p className="disc">
                    I am impressed by the speed and efficiency of the services
                    here. Everything is done quickly without long wait times.
                  </p>
                  <div className="author-area">
                    <a href="#" className="img">
                      <img src={tem04} alt="testiminials" />
                    </a>
                    <div className="info">
                      <h6 className="name">Sarah Lee</h6>
                      <div className="stars-area">
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="single-testimonials-style">
                  <div className="quots">
                    <img src={qoutes} alt="testimonails" />
                  </div>
                  <p className="disc">
                    The healthcare services here are excellent. The doctors
                    answer all of my questions thoroughly, and I feel well cared
                    for.
                  </p>
                  <div className="author-area">
                    <a href="#" className="img">
                      <img src={tem01} alt="testiminials" />
                    </a>
                    <div className="info">
                      <h6 className="name">Michael Brown</h6>
                      <div className="stars-area">
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                        <i className="fa-sharp fa-solid fa-star" />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              ...
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

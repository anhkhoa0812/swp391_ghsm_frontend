import serviceImg02 from "../../../assets/images/service/02.svg";
import serviceImg01 from "../../../assets/images/service/01.svg";
import serviceImg03 from "../../../assets/images/service/03.svg";
import serviceImg04 from "../../../assets/images/service/04.svg";

export default function ShortServices() {
  return (
    <div className="short-service-area rts-section-gap2">
      <div className="container">
        <div className="row g-5">
          <div
            className="col-xl-3 col-lg-4 col-md-6 col-sm-12 wow fadeInRight"
            data-wow-delay=".2s"
            data-wow-duration=".8s"
          >
            <a href="appoinment.html" className="single-short-service">
              <div className="icon">
                <img src={serviceImg01} alt="service" />
              </div>
              <h5 className="title">
                Estimated due date
              </h5>
            </a>
          </div>
          <div
            className="col-xl-3 col-lg-4 col-md-6 col-sm-12 wow fadeInRight"
            data-wow-delay=".4s"
            data-wow-duration=".8s"
          >
            <a href="doctors-one.html" className="single-short-service">
              <div className="icon">
                <img src={serviceImg02} alt="service" />
              </div>
              <h5 className="title">
              Create an appointment
              </h5>
            </a>
          </div>
          <div
            className="col-xl-3 col-lg-4 col-md-6 col-sm-12 wow fadeInRight"
            data-wow-delay=".6s"
            data-wow-duration=".8s"
          >
            <a href="tel:+4733378901" className="single-short-service">
              <div className="icon">
                <img src={serviceImg03} alt="service" />
              </div>
              <h5 className="title">
                Fetus Growth Tracker
              </h5>
            </a>
          </div>
          <div
            className="col-xl-3 col-lg-4 col-md-6 col-sm-12 wow fadeInRight"
            data-wow-delay=".8s"
            data-wow-duration=".8s"
          >
            <a href="contactus.html" className="single-short-service">
              <div className="icon">
                <img src={serviceImg04} alt="service" />
              </div>
              <h5 className="title">
                24/7  <br />
                Support
              </h5>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

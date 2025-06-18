import pic1 from "../../../assets/images/about/01a.png";

export default function Aboutus() {
  return (
    <div>
      <div className="rts-about-area rts-section-gapBottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="about-image-left-wrapper">
                <div className="thumbnail-main move-right wow">
                  <img src={pic1} alt="about" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 offset-lg-1 mt--30">
              <div className="about-content-wrapper-right">
                <div className="title-wrapper-left">
                  <a
                    href="/about" // Đặt URL bạn muốn chuyển tới
                    className="pre wow fadeInUp"
                    data-wow-delay=".2s"
                    data-wow-duration=".8s"
                  >
                    About Us
                  </a>
                  <h2
                    className="title wow fadeInUp"
                    data-wow-delay=".4s"
                    data-wow-duration=".8s"
                  >
                    Providing top-tier healthcare <br /> with a patient-centered
                    focus.
                  </h2>
                </div>
                <p
                  className="disc wow fadeInUp"
                  data-wow-delay=".6s"
                  data-wow-duration=".8s"
                >
                  At HealthWish, we are committed to delivering outstanding
                  healthcare services, prioritizing the needs of our patients.
                  Our goal is to enhance the health and quality of life for our
                  community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

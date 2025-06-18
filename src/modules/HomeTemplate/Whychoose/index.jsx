import choose01 from "../../../assets/images/service/icon/01.svg";
import choose02 from "../../../assets/images/service/03.svg";
import choose03 from "../../../assets/images/service/icon/03.svg";
import choose04 from "../../../assets/images/service/icon/04.svg";
import choose07 from "../../../assets/images/feature/01a.png";

export default function WhyChoose() {
  return (
    <div className="why-choose-us-area">
      <div className="container-80">
        <div className="row">
          <div className="col-lg-12">
            <div className="why-choose-area-wrapper bg-light  rts-section-gap ">
              <div className="container">
                <div className="row align-items-end">
                  <div className="col-xl-5 col-lg-6 mb_md--80 mb_sm--60">
                    <div className="why-choose-us-area-wrapper-main">
                      <div className="title-wrapper-left">
                        <h2
                          className="title wow fadeInUp"
                          data-wow-delay=".4s"
                          data-wow-duration=".8s"
                        >
                          Reasons Our Patients Trust Us
                        </h2>
                      </div>
                      <div className="why-choose-us-main-wrapper">
                        <div
                          className="single-choose-us wow fadeInLeft"
                          data-wow-delay=".2s"
                          data-wow-duration=".8s"
                        >
                          <div className="icon">
                            <img src={choose01} alt="service" />
                          </div>
                          <div className="info">
                            <h6 className="title">
                              Care That Puts Patients First
                            </h6>
                            <p>
                              Showcase your unwavering focus on prioritizing
                              patient needs.
                            </p>
                          </div>
                        </div>
                        <div
                          className="single-choose-us wow fadeInLeft"
                          data-wow-delay=".4s"
                          data-wow-duration=".8s"
                        >
                          <div className="icon">
                            <img src={choose02} alt="service" />
                          </div>
                          <div className="info">
                            <h6 className="title">
                              Rapid Response for Critical Situations
                            </h6>
                            <p>
                              Show your commitment to responding swiftly to
                              urgent medical needs.
                            </p>
                          </div>
                        </div>
                        <div
                          className="single-choose-us wow fadeInLeft"
                          data-wow-delay=".6s"
                          data-wow-duration=".8s"
                        >
                          <div className="icon">
                            <img src={choose03} alt="service" />
                          </div>
                          <div className="info">
                            <h6 className="title">
                              Professional Expertise Backed by Years of Practice
                            </h6>
                            <p>
                              Underscore your team's qualifications and
                              experience in providing compassionate care.{" "}
                            </p>
                          </div>
                        </div>
                        <div
                          className="single-choose-us wow fadeInLeft"
                          data-wow-delay=".8s"
                          data-wow-duration=".8s"
                        >
                          <div className="icon">
                            <img src={choose04} alt="service" />
                          </div>
                          <div className="info">
                            <h6 className="title">
                              24/7 Access to Emergency Assistance
                            </h6>
                            <p>
                              Emphasize your dedication to ensuring that help is
                              always available in critical situations.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 offset-xl-1">
                    <div className="right-whychoose-us-style-one">
                      <div className="thumbnail-image">
                        <img
                          src={choose07}
                          alt="medicle"
                          style={{
                            width: "580px",
                            height: "880px",
                            marginLeft: "-300px",
                            borderRadius: "20px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

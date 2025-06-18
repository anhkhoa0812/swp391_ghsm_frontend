import logo2 from "../../assets/images/logo/logo-2.png";
import BacktoTop from "../Backtotop";
export default function Footer() {
  return (
    <div>
      <div className="rts-footer-area footer-bg pt--105 pt_sm--50">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* subscribe area start */}
              <div className="subscribe-area-start pb--30">
                <a href="#" className="logo">
                  <img src={logo2} alt="logo" />
                </a>
                {/* subscribe area start */}
                {/* subscribe area end */}
              </div>
              {/* subscribe area end */}
            </div>
            <div className="col-lg-12">
              <div className="footer-wrapper-style-between">
                <div className="single-wized">
                  <h6 className="title">Contact</h6>
                  <div className="body">
                    <p className="location">
                      Canada, 245 14h Street Office 42 Calgary, de 52473
                    </p>
                    <a href="#">info@email.com</a>
                    <a href="#">+1 554 558 748</a>
                  </div>
                </div>
                <div className="single-wized">
                  <h6 className="title">Company </h6>
                  <div className="body">
                    <ul className="nav-bottom">
                      <li>
                        <a href="about.html">Company</a>
                      </li>
                      <li>
                        <a href="about.html">About</a>
                      </li>
                      <li>
                        <a href="appoinment.html">Appointment </a>
                      </li>
                      <li>
                        <a href="contact.html">Contact</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="single-wized">
                  <h6 className="title">Our Services</h6>
                  <div className="body">
                    <ul className="nav-bottom">
                      <li>
                        <a href="service-details.html">Orthopaedic</a>
                      </li>
                      <li>
                        <a href="service-details.html">Neurology</a>
                      </li>
                      <li>
                        <a href="service-details.html">Psychiatry </a>
                      </li>
                      <li>
                        <a href="service-details.html">Cardiology</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="single-wized">
                  <h6 className="title">Working Time</h6>
                  <div className="body">
                    <p className="location">Mon - Fri: 9.00am - 5.00pm</p>
                    <p className="location">Saturday: 10.00am - 6.00pm</p>
                    <p className="location">Sunday Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="copyright-area-inner">
                <p>
                  © 2025 Mediweb. All Rights Reserved by&nbsp;
                  <a
                    target="_blank"
                    href="https://themeforest.net/user/themewant"
                  >
                    ThemeWant
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BacktoTop />
    </div>
  );
}

export default function Booking() {
  return (
    <div className="request-appoinment-area rts-section-gapBottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="request-appoinemnt-area-main-wrapper bg_image rts-section-gap">
              <p
                style={{
                  fontSize: "58px",
                  marginBottom: "60px",
                  color: "#1e293b",
                  fontWeight: "500",
                }}
              >
                Welcome to HealthWise Clinic!
              </p>

              <h2
                className="title"
                style={{
                  marginBottom: "60px",
                }}
              >
                Consultation & <br />
                <span>Booking Made Easy</span>
              </h2>

              <a href="/Booking" className="rts-btn btn-primary">
                Arrange Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

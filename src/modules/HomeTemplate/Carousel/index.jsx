export default function Carousel() {
  return (
    <div className="banner-area-start">
      <div className="container-full-header">
        <div className="row">
          <div className="col-lg-12">
            <div className="banner-area-one rts-section-gap bg_image">
              <div className="banner-content-area">
                <h1
                  className="title wow fadeInUp"
                  data-wow-delay=".2s"
                  data-wow-duration=".8s"
                  style={{ marginTop: "-100px" }}
                >
                  Check Your <br />
                  Sexual Health
                </h1>
                <p
                  className="description wow fadeInUp"
                  data-wow-delay=".4s"
                  data-wow-duration=".8s"
                  style={{
                    maxWidth: "550px",
                    marginBottom: "20px",
                    marginTop: "50px",
                  }}
                >
                  It takes just 60 seconds to find out which tests you may need.
                  No sign-up, 100% confidential.
                </p>

                <div>
                  <form
                    className="select-2"
                    action="/quiz"
                    method="get"
                    acceptCharset="utf-8"
                    style={{
                      marginTop: "50px",
                    }}
                  >
                    <a href="/quiz" className="rts-btn btn-primary">
                      Start the Check
                    </a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Form, Input, Typography } from "antd";
import "./index.css";

export default function AboutHealthWise() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  return (
    <div className="about-us-page">
      {/* About Section */}
      <div className="about-section">
        <div className="container">
          <div className="row">
            {/* Image Section */}
            <div className="col-lg-6 image-section">
              <div className="image-wrapper">
                <img
                  src="/abouthealthwise/01.png"
                  alt="About Us"
                  className="about-image"
                />
              </div>
            </div>

            {/* Text Content Section */}
            <div className="col-lg-6 content-section">
              <div className="content-wrapper">
                <h2 className="about-title">
                  Providing top-tier healthcare with a patient-centered focus.
                </h2>
                <p className="about-description">
                  At HealthWish, we are committed to delivering outstanding
                  healthcare services, prioritizing the needs of our patients.
                  Our goal is to enhance the health and quality of life for our
                  community.
                </p>
                <a href="#!" onClick={handleShowModal} className="about-link">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Full Content */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>About HealthWish</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Our Commitment</h4>
          <p>
            At HealthWish, we are committed to delivering outstanding healthcare
            services, prioritizing the needs of our patients. Our services are
            designed to provide the best possible care, combining medical
            expertise with compassion. We strive to improve the health and
            well-being of every individual, enhancing the quality of life for
            the community.
          </p>
          <h4>Patient-Centered Focus</h4>
          <p>
            We believe that patient care should always be centered around the
            needs, preferences, and values of the individual. Every decision we
            make is in pursuit of creating a healthier future for all.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Mission Section */}
      <div className="mission-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 image-section">
              <img
                src="/abouthealthwise/05.png"
                alt="Mission"
                className="about-image"
              />
            </div>
            <div className="col-lg-6 content-section">
              <h2 className="section-title">Our Mission</h2>
              <p className="section-description">
                Our mission is to provide accessible, compassionate, and
                top-quality healthcare services to individuals and families,
                ensuring better health outcomes for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="vision-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 image-section">
              <img
                src="/abouthealthwise/06.png"
                alt="Vision"
                className="about-image"
              />
            </div>
            <div className="col-lg-6 content-section">
              <h2 className="section-title">Our Vision</h2>
              <p className="section-description">
                Our vision is to be the leading healthcare provider in our
                region, promoting wellness through patient-centered care,
                cutting-edge technology, and a focus on preventive medicine.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="values-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 image-section">
              <img
                src="/abouthealthwise/07.png"
                alt="Values"
                className="about-image"
              />
            </div>
            <div className="col-lg-6 content-section">
              <h2 className="section-title">Our Values</h2>
              <ul className="values-list">
                <li>
                  <strong>Compassion:</strong> We believe in treating every
                  patient with kindness, dignity, and respect.
                </li>
                <li>
                  <strong>Integrity:</strong> We act with honesty and
                  transparency in all our interactions.
                </li>
                <li>
                  <strong>Innovation:</strong> We embrace the latest
                  advancements in healthcare to provide the best care possible.
                </li>
                <li>
                  <strong>Collaboration:</strong> We work together as a team,
                  both within our organization and with our patients, to achieve
                  optimal health outcomes.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="team-section">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="row">
            <div className="col-md-4 team-member">
              <div className="team-member-photo">
                <img
                  src="/abouthealthwise/02.png"
                  className="about-image-doctor"
                  alt="Dr. Sarah Lee"
                />
              </div>
              <h3 className="team-member-name">Dr. Sarah Lee</h3>
              <p className="team-member-position">Chief Medical Officer</p>
            </div>
            <div className="col-md-4 team-member">
              <div className="team-member-photo">
                <img
                  src="/abouthealthwise/03.png"
                  className="about-image-doctor"
                  alt="James Taylor"
                />
              </div>
              <h3 className="team-member-name">Dr. James Taylor</h3>
              <p className="team-member-position">Nurse Practitioner</p>
            </div>
            <div className="col-md-4 team-member">
              <div className="team-member-photo">
                <img
                  src="/abouthealthwise/04.png"
                  className="about-image-doctor"
                  alt="Michael Johnson"
                />
              </div>
              <h3 className="team-member-name">Dr. Michael Johnson</h3>
              <p className="team-member-position">Healthcare Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-section">
        <div className="container-contact">
          <h2 className="section-title">
            <a href="/contact" className="contact-button-link">
              Contact Us
              <i className="fas fa-arrow-right"></i>
            </a>
          </h2>

          <p className="section-description">
            Have any questions? Feel free to reach out to us, and our team will
            be happy to assist you.
          </p>
          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <h3>Send us a message</h3>
            <Form onFinish={onFinish} layout="vertical">
              <Form.Item
                label="Full Name"
                name="name"
                rules={[
                  { required: true, message: "Please enter your name" },
                  {
                    pattern: /^[^\d]*$/,
                    message: "Name cannot contain numbers",
                  },
                ]}
              >
                <Input className="form-input" placeholder="Your Name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Invalid email format" },
                ]}
              >
                <Input className="form-input" placeholder="Your Email" />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                  {
                    pattern: /^[0-9]{10,11}$/,
                    message: "Please enter a valid phone number",
                  },
                ]}
              >
                <Input className="form-input" placeholder="Your Phone" />
              </Form.Item>

              <Form.Item
                label="Message"
                name="message"
                rules={[
                  { required: true, message: "Please enter your message" },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  className="form-input"
                  placeholder="Type your message here"
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                className="submit-button"
              >
                Send Message
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Form, Input, Button } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import "./index.css";

export default function ContactPage() {
  const onFinish = (values) => {
    console.log("Form data:", values);
  };

  return (
    <div className="contact-page">
      {/* Lời chào */}
      <div className="contact-header">
        <h2>Contact HealthWise Clinic</h2>
        <p>
          Have questions or need support? Our team is ready to help you book
          consultations, understand your options, and more.
        </p>
      </div>

      {/* Thông tin liên hệ */}
      <div className="contact-info">
        <div className="info-item">
          <EnvironmentOutlined />
          <span>123 Main Street, District 1, Ho Chi Minh City</span>
        </div>
        <div className="info-item">
          <PhoneOutlined />
          <span>(+84) 123 456 789</span>
        </div>
        <div className="info-item">
          <MailOutlined />
          <span>contact@healthwise.vn</span>
        </div>
        <div className="info-item">
          <ClockCircleOutlined />
          <span>Mon - Sat: 08:00 - 17:30</span>
        </div>
      </div>

      {/* Bản đồ */}
      <div className="map-embed">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!..."
          width="100%"
          height="300"
          loading="lazy"
          style={{ border: 0 }}
          allowFullScreen
          title="Clinic Location"
        ></iframe>
      </div>

      {/* Biểu mẫu */}
      <div className="contact-form-wrapper">
        <h3>Send us a message</h3>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Full Name"
            name="name"
            rules={[
              { required: true, message: "Please enter your name" },
              { pattern: /^[^\d]*$/, message: "Name cannot contain numbers" },
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
            rules={[{ required: true, message: "Please enter your message" }]}
          >
            <Input.TextArea
              rows={4}
              className="form-input"
              placeholder="Type your message here"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="submit-button">
            Send Message
          </Button>
        </Form>
      </div>
    </div>
  );
}

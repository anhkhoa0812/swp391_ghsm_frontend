import React from "react";
import { Form, Input, Typography } from "antd";
import LoginBackground from "../../../assets/Login.png";

const { Title, Text } = Typography;

export default function LoginUI() {
  return (
    <div>
      <div style={{ display: "flex", height: "100vh" }}>
        {/* Image */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <img
            src={LoginBackground}
            alt="Login background"
            style={{
              width: "100%",
              height: "80%",
              objectFit: "cover",
              borderRadius: "12px",
            }}
          />
        </div>

        {/* Login form */}
        <div style={{ flex: 1, padding: "20px" }}>
          <div className="row justify-content-md-center">
            <div className="col-md-auto mb-3">
              <Title>Login</Title>
            </div>
          </div>

          <Text
            style={{
              display: "block",
              marginBottom: "20px",
              marginLeft: "24px",
            }}
          >
            Enter your email to log in to your HealthWise account!
          </Text>

          <Form layout="vertical" onFinish={() => {}}>
            <Form.Item
              name="email"
              rules={[
                { type: "email", message: "Email is incorrect!" },
                { required: true, message: "Please enter your email!" },
              ]}
              style={{ marginBottom: 35 }}
            >
              <Input placeholder="Email" style={{ height: 50, fontSize: 16 }} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please enter password!" }]}
              style={{ marginBottom: 50 }}
            >
              <Input.Password
                placeholder="Password"
                style={{ height: 50, fontSize: 16 }}
              />
            </Form.Item>

            <Form.Item>
              <div className="row justify-content-md-center">
                <div className="col-md-auto">
                  <button className="rts-btn btn-primary" type="submit">
                    Log in
                  </button>
                </div>
              </div>
            </Form.Item>
          </Form>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Text>New to HealthWise ?</Text>
          </div>
        </div>
      </div>
    </div>
  );
}

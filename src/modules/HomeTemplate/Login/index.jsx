import React, { useState } from "react";
import { Form, Input, Typography, message as Message } from "antd";
import LoginBackground from "../../../assets/Login.png";
import BackdropLoader from "../../../components/BackdropLoader";
import authApi from "../../../api/authApi";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export default function LoginUI({ setActiveTab, onLoginSuccess }) {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();


  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await authApi.login(credentials.email, credentials.password);
      console.log("Login response data:", response);
      Message.success("Login successful");

      localStorage.setItem('USER_TOKEN', JSON.stringify({
        userId: response.userId,
        token: response.token,
        avatar: response.avatar
      }));

      onLoginSuccess({
        userId: response.userId,
        token: response.token,
        avatar: response.avatar
      });

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      Message.error("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

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
          <BackdropLoader open={loading} />
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

          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="email"
              rules={[
                { type: "email", message: "Email is incorrect!" },
                { required: true, message: "Please enter your email!" },
              ]}
              style={{ marginBottom: 35 }}
            >
              <Input
                placeholder="Email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                style={{ height: 50, fontSize: 16 }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter password!" },
                { min: 8, message: "Password must be at least 8 characters!" },
                {
                  pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Password must contain letters, numbers, and special characters!",
                },
              ]}
              style={{ marginBottom: 50 }}
            >
              <Input.Password
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
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
            <Text>
              New to HealthWise?{" "}
              <a onClick={() => setActiveTab && setActiveTab(1)}>Sign up now!</a>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
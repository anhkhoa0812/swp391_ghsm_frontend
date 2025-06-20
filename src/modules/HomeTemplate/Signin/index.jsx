import React, { useState } from "react";
import { Form, Input, Typography, message as Message } from "antd";
import SigninBackground from "../../../assets/Signin.png";
import BackdropLoader from "../../../components/BackdropLoader";
import authApi from "../../../api/authApi";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export default function Signin({ setActiveTab, onLoginSuccess }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    roleId: "8E769FE0-EC63-45BC-A0C2-4BA7870CBA32",
    phoneNumber: "",
    gender: "",
  });
  const navigate = useNavigate();


  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await authApi.register(
        user.fullName,
        user.email,
        user.password,
        user.roleId,
        user.phoneNumber,
        user.gender
      );

      const userData = {
        userId: response.userId || "generated-user-id",
        token: response.token || "generated-token",
        avatar: response.avatar || null
      };
      Message.success("Registration successful");
      localStorage.setItem('USER_TOKEN', JSON.stringify(userData));
      onLoginSuccess(userData);
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      Message.error("Registration failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div style={{ flex: 1, overflow: "hidden" }}>
        <img
          src={SigninBackground}
          alt="Signin background"
          style={{
            width: "100%",
            height: "80%",
            objectFit: "cover",
            display: "block",
            borderRadius: "12px",
          }}
        />
      </div>
      <div
        style={{
          flex: 1,
          marginTop: -180,
          padding: "40px 20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <BackdropLoader open={loading} />
        <div style={{ width: "100%", maxWidth: 400, margin: "0 auto" }}>
          <div className="row justify-content-md-center">
            <div className="col-md-auto mb-3">
              <Title>Sign up</Title>
            </div>
          </div>
          <Text
            style={{
              display: "block",
              marginBottom: "20px",
              marginLeft: "24px",
            }}
          >
            Enter your details to become a new HealthWise member!
          </Text>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="fullName"
              rules={[{ required: true, message: "Please enter full name!" }]}
              style={{ marginBottom: 35 }}
            >
              <Input
                placeholder="Full name"
                value={user.fullName}
                onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                style={{ height: 50, fontSize: 16 }}
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { type: "email", message: "Email is incorrect!" },
                { required: true, message: "Please enter email!" },
              ]}
              style={{ marginBottom: 35 }}
            >
              <Input
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
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
              style={{ marginBottom: 35 }}
            >
              <Input.Password
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                style={{ height: 50, fontSize: 16 }}
              />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              rules={[
                { required: true, message: "Please enter phone number!" },
                { pattern: /^\d{10,11}$/, message: "Phone number must be 10-11 digits!" },
              ]}
              style={{ marginBottom: 35 }}
            >
              <Input
                placeholder="Phone Number"
                value={user.phoneNumber}
                onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                style={{ height: 50, fontSize: 16 }}
              />
            </Form.Item>
            <Form.Item
              name="gender"
              rules={[{ required: true, message: "Please enter gender!" }]}
              style={{ marginBottom: 50 }}
            >
              <Input
                placeholder="Gender (e.g., Male, Female)"
                value={user.gender}
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
                style={{ height: 50, fontSize: 16 }}
              />
            </Form.Item>
            <Form.Item>
              <div className="row justify-content-md-center">
                <div className="col-md-auto">
                  <button className="rts-btn btn-primary" type="submit">
                    Sign up
                  </button>
                </div>
              </div>
            </Form.Item>
          </Form>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Text>
              Already have an account?{" "}
              <a onClick={() => setActiveTab(0)}>Log in now!</a>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
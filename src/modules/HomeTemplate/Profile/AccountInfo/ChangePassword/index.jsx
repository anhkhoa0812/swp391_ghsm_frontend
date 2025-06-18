import React, { useState } from "react";
import { Modal, Form, Input, Button, Typography, message } from "antd";
import { motion } from "framer-motion";
import { useChangePassword } from "../../../../../apis/CallAPIUser";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const ChangePassword = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Call API
  const changePassword = async (oldPassword, newPassword) => {
    try {
      const res = await useChangePassword(oldPassword, newPassword);

      if (res.code === 200) {
        message.success(res.message || "Password changed successfully");
        form.resetFields();
        localStorage.removeItem("USER_TOKEN"); // Xóa token để bắt buộc đăng nhập lại
        navigate("/");
        onCancel(); // Đóng modal
      } else {
        message.error("Failed to change password");
      }
    } catch (error) {
      message.error(error.message || "Error changing password");
    } finally {
      setLoading(false);
    }
  };

  const onFinish = (values) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("New password and confirm password do not match");
      return;
    }
    setLoading(true);
    changePassword(values.oldPassword, values.newPassword);
  };

  // Các variants cho hiệu ứng framer-motion
  const contentVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  return (
    <Modal open={visible} onCancel={onCancel} footer={null} width={450}>
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Title level={4}>Change Your Password</Title>
          <Text type="secondary">
            For security, please verify your identity
          </Text>
        </div>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="oldPassword"
            label="Current Password"
            rules={[
              {
                required: true,
                message: "Please enter your current password",
              },
            ]}
          >
            <Input.Password placeholder="Enter current password" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              {
                required: true,
                message: "Please enter your new password",
              },
              { min: 8, message: "Password must be at least 8 characters" },
            ]}
            extra="Use 8 or more characters with a mix of letters, numbers & symbols."
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            dependencies={["newPassword"]}
            rules={[
              {
                required: true,
                message: "Please confirm your new password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              loading={loading}
              block
              style={{ backgroundColor: "#615EFC", color: "white" }}
            >
              Change Password
            </Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={onCancel} block>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </motion.div>
    </Modal>
  );
};

export default ChangePassword;

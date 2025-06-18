import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Avatar } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebase/firebaseConfig";
import { useUpdateUser, useUserInfo } from "../../../../apis/CallAPIUser";
import avatar from "../../../../assets/PregnantAvatar.jpg";
import { Box } from "@mui/material";
import BackdropLoader from "../../../../component/BackdropLoader";
import ChangePassword from "./ChangePassword";

export default function AccountInfo() {
  const [form] = Form.useForm();
  const [user, setUser] = useState({
    id: 0,
    fullName: "",
    email: "",
    password: "",
    image: null,
    url: null,
  });
  const [loading, setLoading] = useState(null);
  const defaultAvatar = avatar;
  const [refresh, setRefresh] = useState(0);
  const [showChangePassword, setShowChangePassword] = useState(false);

  // Lấy ảnh từ firebase
  const handleGetImage = async (id) => {
    const storageRef = ref(storage, `pregnancyCareImages/users/${id}`);
    try {
      const downloadURL = await getDownloadURL(storageRef);
      if (downloadURL) {
        setUser((prev) => ({ ...prev, url: downloadURL }));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setUser((prev) => ({ ...prev, url: avatar }));
    }
  };

  // Upload ảnh lên Firebase
  const handleUpload = async () => {
    const storageRef = ref(storage, `pregnancyCareImages/users/${user.id}`);
    try {
      await uploadBytes(storageRef, user.image);
    } catch (error) {
      console.error("Upload error:", error);
      setLoading(false);
    }
  };

  // Lấy thông tin người dùng khi component được mount
  const handleUser = () => {
    setLoading(true);
    useUserInfo()
      .then((res) => {
        if (res.code === 200 && res.data) {
          setUser(res.data);
          form.setFieldsValue({
            fullName: res.data.fullName,
            email: res.data.email,
          });
          handleGetImage(res.data.id);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  // Xử lý khi submit form để update thông tin người dùng
  const onFinish = () => {
    setLoading(true);
    const data = {
      fullName: user.fullName,
      email: user.email,
      password: "",
    };

    useUpdateUser(user.id, data)
      .then(() => {
        message.success("Updated user successfully");
        if (user.image != null) handleUpload();
        setRefresh((prev) => prev + 1);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Update error:", error);
      });
  };

  useEffect(() => {
    // Tải thông tin của user khi vào trang này
    handleUser();
  }, [form, refresh]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <BackdropLoader open={loading} />
      {/* Hiển thị Avatar */}
      <div className="row justify-content-md-center mt-5">
        <div className="col-md-auto">
          <Avatar
            size={80}
            src={user.url ? user.url : defaultAvatar}
            style={{ marginBottom: 16 }}
          />
        </div>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="fullName"
          rules={[{ required: true, message: "Please enter full name!" }]}
        >
          <Input
            placeholder="Full name"
            style={{ height: 50, fontSize: 16 }}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, fullName: e.target.value }))
            }
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please enter email!" }]}
        >
          <Input
            placeholder="Email"
            style={{ height: 50, fontSize: 16 }}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </Form.Item>

        {/* Upload ảnh */}
        <Form.Item name="image">
          <Upload
            showUploadList={false}
            beforeUpload={() => false} // Ngăn upload tự động
            onChange={(value) => {
              setUser((prev) => ({ ...prev, image: value.file }));
            }}
          >
            <Button icon={<UploadOutlined />}>Update</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Input
            placeholder="Password"
            disabled
            style={{ height: 50, fontSize: 16 }}
          />
        </Form.Item>

        {/* Link mở modal ChangePassword */}
        <a
          href="#"
          className="text-decoration-underline"
          onClick={(e) => {
            e.preventDefault();
            setShowChangePassword(true);
          }}
        >
          Change password
        </a>

        <Form.Item>
          <div className="row justify-content-center">
            <div className="col-md-auto">
              <button type="submit" className="rts-btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </Form.Item>
      </Form>

      {/* Gọi ChangePasswordModal */}
      <ChangePassword
        visible={showChangePassword}
        onCancel={() => setShowChangePassword(false)}
      />
    </Box>
  );
}

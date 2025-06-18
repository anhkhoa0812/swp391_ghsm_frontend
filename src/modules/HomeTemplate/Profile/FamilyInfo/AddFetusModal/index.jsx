import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Radio,
  Button,
  Upload,
  Typography,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import { storage } from "../../../../../firebase/firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
import { useCreateFetus } from "../../../../../apis/CallAPIFetus";

export default function AddFetusModal({ visible, onClose, refreshFetusList }) {
  const [fetus, setFetus] = useState({
    id: 0,
    name: "",
    dueDate: null,
    gender: "",
    email: "",
    image: null,
  });
  const [form] = Form.useForm();

  // Disable dates before today or more than 280 days from today.
  const disabledDate = (current) => {
    const today = moment().startOf("day");
    const maxDate = moment().add(280, "days");
    return current && (current < today || current > maxDate);
  };

  // Handle file selection and upload to Firebase Storage
  const handleUpload = async (id) => {
    const file = fetus.image;
    const storageRef = ref(storage, `pregnancyCareImages/fetus/${id}`);
    try {
      await uploadBytes(storageRef, file);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  // Handle form submission sau khi các trường đã được validate thành công
  const handleSubmit = async () => {
    try {
      const res = await useCreateFetus(fetus);
      if (res.code === 201) {
        if (fetus.image) {
          await handleUpload(res.data.idFetus);
        }
        setFetus((prev) => ({
          ...prev,
          name: "",
          dueDate: null,
          gender: "",
          image: null,
        }));
        message.success("Fetus created successfully");
        await refreshFetusList();
        onClose();
      }
    } catch (error) {
      message.error("Error creating fetus: " + error.message);
    }
  };

  // Lấy email từ localStorage và gán vào state fetus.
  useEffect(() => {
    const storedData = localStorage.getItem("USER_TOKEN");
    if (storedData) {
      const user = JSON.parse(storedData);
      setFetus((prev) => ({ ...prev, email: user.email }));
    }
  }, []);

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      closeIcon={<span style={{ cursor: "pointer" }}>&times;</span>}
    >
      <div>
        <Typography style={{ color: "#615EFC", fontSize: 35, fontWeight: 500 }}>
          My pregnancy
        </Typography>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onFinishFailed={(errorInfo) => {
            console.log("Validation Failed:", errorInfo);
          }}
        >
          <div className="row">
            <div className="col">
              <span>A photo helps you personalize yourself</span>
            </div>
            <div className="col-3">
              <Form.Item
                name="image"
                valuePropName="file"
                getValueFromEvent={(e) => {
                  return e && e.file;
                }}
                rules={[
                  { required: true, message: "Image is required" },
                  {
                    validator: (_, value) => {
                      if (
                        value &&
                        value.type &&
                        value.type.startsWith("image/")
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("File must be an image"));
                    },
                  },
                ]}
              >
                <Upload
                  showUploadList={false}
                  beforeUpload={() => false} // Ngăn upload tự động
                  onChange={(value) => {
                    const file = value.file;
                    form.setFieldsValue({ image: file });
                    setFetus({ ...fetus, image: file });
                  }}
                >
                  <Button icon={<UploadOutlined />}>Update</Button>
                </Upload>
              </Form.Item>
            </div>
          </div>

          <Form.Item
            label="Due date"
            name="dueDate"
            rules={[{ required: true, message: "Due date is required" }]}
          >
            <DatePicker
              size="large"
              style={{ width: "100%" }}
              disabledDate={disabledDate}
              onChange={(date) => setFetus({ ...fetus, dueDate: date })}
            />
          </Form.Item>

          <Form.Item
            label="Baby's name"
            name="babyName"
            rules={[
              { required: true, message: "Baby's name is required" },
              { min: 2, message: "Name must be at least 2 characters" },
            ]}
          >
            <Input
              style={{ height: "38px" }}
              onChange={(e) => setFetus({ ...fetus, name: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            label="Baby's sex"
            name="babySex"
            rules={[{ required: true, message: "Gender is required" }]}
          >
            <Radio.Group
              onChange={(e) => setFetus({ ...fetus, gender: e.target.value })}
            >
              <Radio value="girl">Girl</Radio>
              <Radio value="boy">Boy</Radio>
              <Radio value="dontKnow">Don't know</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <div style={{ marginTop: "8px", fontSize: "12px" }}>
              You can unsubscribe at any time. By continuing, you agree to our
              Terms of Use and Privacy Policy.
            </div>
          </Form.Item>

          <div style={{ marginTop: "16px" }}>
            <div className="row justify-content-md-center">
              <div className="col-md-auto">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="rts-btn btn-primary"
                >
                  Add to my family
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </Modal>
  );
}

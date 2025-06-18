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
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  useDeleteFetus,
  useUpdateFetus,
} from "../../../../../apis/CallAPIFetus";

export default function EditFetusModal({
  visible,
  onClose,
  fetus,
  refreshFetusList,
}) {
  const [editedFetus, setEditedFetus] = useState({
    id: 0,
    name: "",
    dueDate: null,
    gender: "",
    image: null,
  });
  const [form] = Form.useForm();

  // Disable dates before today or more than 280 days from today.
  const disabledDate = (current) => {
    const today = moment().startOf("day");
    const maxDate = moment().add(280, "days");
    return current && (current < today || current > maxDate);
  };

  // Handle file selection and upload (ghi đè ảnh đã có trên Firebase)
  const handleUpload = async () => {
    if (!editedFetus.image) {
      return;
    }
    // Lấy file từ editedFetus.image
    const file = editedFetus.image.originFileObj
      ? editedFetus.image.originFileObj
      : editedFetus.image;
    const storageRef = ref(
      storage,
      `pregnancyCareImages/fetus/${editedFetus.id}`
    );
    try {
      await uploadBytes(storageRef, file);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  // Handle form submission: gọi PUT API cập nhật fetus và nếu có ảnh mới thì upload
  const handleSubmit = async (values) => {
    const updatedFetus = { ...editedFetus, ...values };
    // Nếu dueDate là moment object, chuyển thành ISO string
    if (updatedFetus.dueDate && moment.isMoment(updatedFetus.dueDate)) {
      updatedFetus.dueDate = updatedFetus.dueDate.toISOString();
    }
    try {
      const res = await useUpdateFetus(updatedFetus.id, updatedFetus);
      if (updatedFetus.image) {
        await handleUpload();
      }
      if (res.code === 200) message.success("Fetus updated successfully");
      await refreshFetusList();
      onClose();
    } catch (error) {
      console.error("Error updating fetus:", error);
      message.error("Error updating fetus: " + error.message);
    }
  };

  // Handle deletion (bao gồm xóa ảnh trên Firebase Storage)
  const handleDelete = async () => {
    try {
      const imageRef = ref(
        storage,
        `pregnancyCareImages/fetus/${editedFetus.id}`
      );
      await deleteObject(imageRef);
      const res = await useDeleteFetus(editedFetus.id);
      if (res.code === 200) {
        message.success("Deleted fetus successfully");
        await refreshFetusList();
        onClose();
      }
    } catch (err) {
      console.error("Error deleting fetus or image:", err);
      message.error("Error deleting fetus or image: " + err.message);
    }
  };

  // Khi mở modal, khởi tạo dữ liệu từ fetus truyền vào
  useEffect(() => {
    if (fetus) {
      const newFetus = {
        id: fetus.id,
        name: fetus.name || "",
        dueDate: fetus.dueDate ? moment(fetus.dateFetus) : null,
        gender: fetus.gender || "",
        image: null, // khởi tạo null, chỉ cập nhật nếu người dùng chọn ảnh mới
      };
      setEditedFetus(newFetus);
      form.setFieldsValue(newFetus);
    }
  }, [fetus, form]);

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      closeIcon={<span style={{ cursor: "pointer" }}>&times;</span>}
    >
      <div>
        <Typography style={{ color: "#615EFC", fontSize: 35, fontWeight: 500 }}>
          Edit Pregnancy Info
        </Typography>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onFinishFailed={(errorInfo) =>
            console.log("Validation Failed:", errorInfo)
          }
        >
          <div className="row">
            <div className="col">
              <span>A photo helps you personalize yourself</span>
            </div>
            <div className="col-3">
              <Form.Item
                name="image"
                valuePropName="file"
                getValueFromEvent={(e) => e && e.file}
                rules={[
                  { required: false },
                  {
                    validator: (_, value) => {
                      if (!value) return Promise.resolve();
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
                  onChange={(info) => {
                    const file = info.file;
                    form.setFieldsValue({ image: file });
                    // Cập nhật state editedFetus với file ảnh mới
                    setEditedFetus((prev) => ({ ...prev, image: file }));
                  }}
                >
                  <Button icon={<UploadOutlined />}>Update</Button>
                </Upload>
              </Form.Item>
            </div>
          </div>

          {/* Due date */}
          <Form.Item
            label="Due date"
            name="dueDate"
            rules={[{ required: true, message: "Due date is required" }]}
          >
            <DatePicker
              size="large"
              style={{ width: "100%" }}
              disabledDate={disabledDate}
            />
          </Form.Item>

          {/* Baby's name */}
          <Form.Item
            label="Baby's name"
            name="name"
            rules={[
              { required: true, message: "Baby's name is required" },
              { min: 2, message: "Name must be at least 2 characters" },
            ]}
          >
            <Input style={{ height: "38px" }} />
          </Form.Item>

          {/* Baby's sex */}
          <Form.Item
            label="Baby's sex"
            name="gender"
            rules={[{ required: true, message: "Gender is required" }]}
          >
            <Radio.Group>
              <Radio value="girl">Girl</Radio>
              <Radio value="boy">Boy</Radio>
              <Radio value="dontKnow">Don't know</Radio>
            </Radio.Group>
          </Form.Item>

          <div style={{ marginTop: "16px" }}>
            <div className="row justify-content-md-center mb-4">
              <div className="col-md-auto">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="rts-btn btn-primary"
                >
                  Save
                </Button>
              </div>
            </div>
            <div className="row justify-content-md-center">
              <div className="col-md-auto">
                <a onClick={handleDelete} className="text-decoration-underline">
                  Remove from profile
                </a>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </Modal>
  );
}

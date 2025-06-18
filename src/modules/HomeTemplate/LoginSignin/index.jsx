/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { Modal } from "antd";
import { AppBar, Box, Tab, Tabs } from "@mui/material";
import Login from "../Login";
import Signin from "../Signin";

// Danh sách các tab trong phần Account Settings
const tabLabels = ["Log in", "Sign in"];



export default function LoginSignin({ open, onClose }) {
  // Quản lý state cho tab đang được chọn
  const [activeTab, setActiveTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={900}
      style={{ marginTop: -90 }}
    >
      <Box margin={3}>
        <AppBar
          position="static"
          color="default"
          sx={{ boxShadow: "none", mb: "30px" }}
        >
          <Tabs value={activeTab} onChange={handleChangeTab}>
            {tabLabels.map((label, index) => (
              <Tab sx={{ fontSize: 15 }} key={index} label={label} />
            ))}
          </Tabs>
        </AppBar>

        {/* Nội dung cho từng tab*/}
        {activeTab === 0 && <Login onClose={onClose} />}
        {activeTab === 1 && <Signin setActiveTab={setActiveTab} />}
      </Box>
    </Modal>
  );
}

/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Modal } from "antd";
import { AppBar, Box, Tab, Tabs } from "@mui/material";
import Login from "../Login";
import Signin from "../Signin";

const tabLabels = ["Log in", "Sign up"];

export default function LoginSignin({ open, onClose, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSuccess = (userData) => {
    onLoginSuccess(userData);
    onClose();
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

        {activeTab === 0 && <Login setActiveTab={setActiveTab} onLoginSuccess={handleSuccess} />}
        {activeTab === 1 && <Signin setActiveTab={setActiveTab} onLoginSuccess={handleSuccess} />}
      </Box>
    </Modal>
  );
}
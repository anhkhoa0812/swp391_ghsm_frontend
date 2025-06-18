/* eslint-disable no-unused-vars */
import React from "react";
import { Drawer, Avatar, Divider, Typography } from "antd";
import StyledButton from "../StyleButton";
import avatar from "../../assets/PregnantAvatar.jpg";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

// Các biến variants cho animation của container và các item
const containerVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

const DrawerMenu = ({
  drawerOpen,
  handleCloseDrawer,
  user,
  url,
  handleLogout,
}) => {
  return (
    <Drawer
      placement="right"
      closable={true}
      onClose={handleCloseDrawer}
      open={drawerOpen}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          style={{ textAlign: "center", padding: "20px 0" }}
        >
          <Avatar src={url || avatar} size={80} style={{ marginBottom: 10 }} />
          <Typography style={{ fontSize: 20, color: "#615EFC" }}>
            {user?.email || "User"}
          </Typography>
        </motion.div>
        <Divider />
        <motion.div variants={itemVariants}>
          <StyledButton
            to="/profile"
            className="mb-4 p-5 fs-3"
            onCloseDrawer={handleCloseDrawer}
          >
            My Family Info
          </StyledButton>
        </motion.div>
        <motion.div variants={itemVariants}>
          <StyledButton
            to="/profile"
            className="mb-4 p-5 fs-3"
            onCloseDrawer={handleCloseDrawer}
          >
            Personal Info
          </StyledButton>
        </motion.div>
        <motion.div variants={itemVariants}>
          <StyledButton
            to="/"
            className="mb-4 p-5 fs-3"
            type="danger"
            onClick={handleLogout}
          >
            Log out
          </StyledButton>
        </motion.div>
      </motion.div>
    </Drawer>
  );
};

export default DrawerMenu;

import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

/**
 * BackdropLoader - Component hiển thị loading với Backdrop của MUI
 * @param {boolean} open - Trạng thái hiển thị backdrop
 */
const BackdropLoader = ({ open }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackdropLoader;

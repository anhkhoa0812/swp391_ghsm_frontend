import React from "react";
import { Menu, MenuItem } from "@mui/material";

export default function CommentActionMenu({
  anchorEl,
  open,
  handleClose,
  handleEdit,
  handleDelete,
}) {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
      <MenuItem onClick={handleEdit}>Edit</MenuItem>
      <MenuItem onClick={handleDelete}>Delete</MenuItem>
    </Menu>
  );
}

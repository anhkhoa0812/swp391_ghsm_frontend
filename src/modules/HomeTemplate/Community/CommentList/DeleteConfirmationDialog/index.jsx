import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export default function DeleteConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  content = "Are you sure you want to delete this comment?",
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-confirmation-dialog"
      slotProps={{
        paper: {
          sx: { p: 2, width: 420, height: 230 },
        },
      }}
    >
      <DialogTitle id="delete-confirmation-dialog" sx={{ fontSize: 25 }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontSize: 17 }}>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
          sx={{ fontSize: 15, color: "grey.600", borderColor: "grey.600" }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          autoFocus
          sx={{ fontSize: 15 }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

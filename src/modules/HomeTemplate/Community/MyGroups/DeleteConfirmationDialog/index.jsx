import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export default function DeleteConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title,
  content,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 420,
          height: 270,
          p: 3,
          borderRadius: "16px",
        },
      }}
    >
      <DialogTitle sx={{ fontSize: 25, fontWeight: 500 }}>
        {title || "Confirm Deletion"}
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ fontSize: 20 }}>
          {content || "Are you sure you want to delete this item?"}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ p: 1.5, fontSize: 12 }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          sx={{ p: 1.5, fontSize: 12 }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

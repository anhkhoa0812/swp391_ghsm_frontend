import React, { useState, forwardRef } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Zoom,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { message as Message } from "antd";
import { useCreateGroup } from "../../../../../apis/CallAPIGroup";
import { useUploadImage } from "../../../../../apis/CallAPIFirebase";

// Transition hiệu ứng Slide khi mở Dialog
const Transition = forwardRef((props, ref) => (
  <Zoom direction="up" ref={ref} {...props} />
));

export default function AddGroupDialog({ onGroupAdded }) {
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Khi chọn file ảnh
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Xử lý tải ảnh lên Firebase
  const handleUploadImage = async (id) => {
    await useUploadImage(`pregnancyCareImages/groups`, imageFile, id);
  };

  // Xử lý lưu Group
  const handleSave = async () => {
    if (!groupName.trim()) {
      Message.error("Group name is required");
      return;
    }
    if (!imageFile) {
      Message.error("Please select an image for group");
      return;
    }
    setLoading(true);
    try {
      const groupData = {
        name: groupName,
        description: groupDescription,
      };
      const res = await useCreateGroup(groupData);
      if (res.code === 200) {
        Message.success("Group added successfully!");
        if (onGroupAdded) {
          handleUploadImage(res.data.id);
          onGroupAdded(res.data);
        }
        // Reset form
        setGroupName("");
        setGroupDescription("");
        setImageFile(null);
        setImagePreview(null);
        setOpen(false);
      } else {
        Message.error("Failed to add group");
        console.error("Failed to add group", res);
      }
    } catch (error) {
      console.error("Error adding group:", error);
      Message.error("Failed to add group");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {/* Button mở dialog */}
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
        sx={{
          backgroundColor: "#615EFC",
          color: "#FFFFFF",
          fontWeight: "bold",
          padding: "10px 20px",
          boxShadow: "0 3px 5px 2px rgba(97,94,252,0.3)",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            backgroundColor: "#5045D9",
          },
        }}
      >
        Create Group
      </Button>

      {/* Dialog tạo group */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition} // Hiệu ứng mở modal
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "16px",
            padding: 3,
            boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
            backgroundColor: "#FFFFFF",
            width: "500px", // Tăng kích thước modal
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#201F57",
            fontSize: 30,
          }}
        >
          New Group
        </DialogTitle>

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          {/* Group Name */}
          <TextField
            label="Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{
              mt: 2,
              "& .MuiInputLabel-root": {
                fontSize: "1.4rem",
                fontWeight: "bold",
                marginBottom: "5rem",
                marginTop: "-1rem",
                "&:hover": {
                  color: "#615EFC", // Màu label khi hover
                },
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                fontSize: "2rem",
                "&:hover fieldset": {
                  borderColor: "#615EFC", // Màu viền khi hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#615EFC", // Màu viền khi active/focus
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#615EFC", // Màu label khi active/focus
              },
            }}
          />

          {/* Group Description */}
          <TextField
            label="Description"
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: "1.4rem",
                fontWeight: "bold",
                marginBottom: "5rem",
                marginTop: "-1rem",
                "&:hover": {
                  color: "#615EFC", // Màu label khi hover
                },
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                fontSize: "2rem",
                "&:hover fieldset": {
                  borderColor: "#615EFC", // Màu viền khi hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#615EFC", // Màu viền khi active/focus
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#615EFC", // Màu label khi active/focus
              },
            }}
          />

          {/* Upload ảnh */}
          <Box>
            <div className="row">
              <div className="col">
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  sx={{
                    borderColor: "#615EFC",
                    color: "#615EFC",
                    p: 2,
                    fontSize: 15,
                    "&:hover": { backgroundColor: "#f0f0f0" },
                  }}
                >
                  Upload Image
                  <input type="file" hidden onChange={handleFileChange} />
                </Button>
              </div>
              <div className="col">
                {imagePreview && (
                  <Box>
                    <p>{imageFile.name}</p>
                  </Box>
                )}
              </div>
            </div>
          </Box>
        </DialogContent>

        {/* Actions */}
        <DialogActions sx={{ justifyContent: "center", mt: 2 }}>
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            sx={{
              px: 3,
              fontSize: 12,
              borderColor: "#201F57",
              color: "#201F57",
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              px: 3,
              fontSize: 12,
              backgroundColor: "#615EFC",
              color: "#FFFFFF",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#5045D9" },
            }}
            disabled={loading}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

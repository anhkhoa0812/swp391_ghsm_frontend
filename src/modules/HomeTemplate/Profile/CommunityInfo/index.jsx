import React from "react";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import GroupInfoBackground from "../../../../assets/GroupInfoBackground.jpg";

export default function CommunityInfo() {
  return (
    <Box
      sx={{
        // Giới hạn chiều rộng cho form
        margin: "0 auto",
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {/* Header với hình nền lá */}
      <Box
        sx={{
          width: "100%",
          height: 200,
          backgroundImage: `url(${GroupInfoBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
          position: "relative",
        }}
      >
        {/* IconButton đặt ở giữa dưới cùng của header */}
        <Box
          sx={{
            position: "absolute",
            bottom: -50,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <IconButton
            color="primary"
            sx={{
              backgroundColor: "#fff",
              boxShadow: 3,
            }}
          >
            <CameraAltIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Nội dung form */}
      <Box sx={{ p: 2, mt: 4, mb: 5 }}>
        <Typography variant="h6" gutterBottom>
          Create screen name
        </Typography>

        <TextField
          label="Bio"
          fullWidth
          multiline
          inputProps={{ maxLength: 70 }}
          helperText="Max. 70 characters"
          sx={{ mb: 2 }}
        />

        <TextField
          label="Signature"
          fullWidth
          multiline
          rows={3}
          helperText="Max. 100 characters / 3 lines"
          sx={{ mb: 2 }}
        />

        <div class="row justify-content-md-center">
          <div class="col-md-auto">
            <button className="rts-btn btn-primary">Save</button>
          </div>
        </div>
      </Box>
    </Box>
  );
}

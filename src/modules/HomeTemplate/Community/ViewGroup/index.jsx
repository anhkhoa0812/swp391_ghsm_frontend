import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import avatar from "../../../../assets/PregnantAvatar.jpg";
import { useNavigate } from "react-router-dom";

export default function ViewGroup({ group }) {
  const navigate = useNavigate();

  // Direct to create post pages
  const onHandlePost = () => {
    navigate(`/community/group/create-post/${group?.id}`);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      marginTop={5}
      width="100%"
    >
      {/* Avatar of grou[] */}
      <img
        src={avatar}
        alt="Avatar of group"
        style={{ width: 100, borderRadius: 10, marginBottom: 20 }}
      />

      {/* Group Name */}
      <Typography variant="h2" fontWeight="bold" gutterBottom>
        {group?.name}
      </Typography>

      {/* Members and posts and info */}
      <div className="row justify-content-md-center mb-5">
        <div className="col-md-auto">
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {group?.users.length}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            members
          </Typography>
        </div>
        <div className="col-md-auto">
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {group?.blogs.length}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            posts
          </Typography>
        </div>
        <div className="col-md-auto">
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {group?.owner.fullName}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            owner
          </Typography>
        </div>
      </div>

      {/* Post button */}
      <button className="rts-btn btn-primary" onClick={() => onHandlePost()}>
        Post
      </button>
    </Box>
  );
}

import {
  Box,
  TextField,
  Typography,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import avatar from "../../../../assets/PregnantAvatar.jpg";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment/moment";
import { useCreateComment } from "../../../../apis/CallAPIComment";
import { message as Message } from "antd";
import BackdropLoader from "../../../../component/BackdropLoader";

export default function ViewPost({ data, onCommentCreated }) {
  // Information of a post
  const [post, setPost] = useState(data);
  // Comment
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // Khi prop data thay đổi, cập nhật lại state local
  useEffect(() => {
    setPost(data);
  }, [data]);

  const handleSubmit = async () => {
    if (comment === "") {
      Message.error("Please enter comment");
      return;
    }
    setLoading(true);
    const res = await useCreateComment(data.id, comment);
    if (res.code === 200) {
      setComment("");
      Message.success("Comment successfully");
      // Gọi callback để re-render comment list
      if (onCommentCreated) {
        onCommentCreated();
      }
      setLoading(false);
    }
  };

  return (
    <Box>
      <BackdropLoader open={loading} />
      <Typography variant="h2" fontWeight="bold" gutterBottom>
        {post.title}
      </Typography>
      {/* Member Name */}
      <div className="row mb-4">
        <div className="col-1">
          <img
            src={avatar}
            alt="Avatar of member"
            style={{ width: 50, borderRadius: "50%" }}
          />
        </div>
        <div className="col-8">
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {post.user.fullName}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {moment(post.datePublish).format("MMMM D, YYYY")}
          </Typography>
        </div>
      </div>
      {/* Content of post */}
      <Typography variant="h5" gutterBottom>
        {post.description}
      </Typography>

      <Divider sx={{ my: 2, borderBottomWidth: 1, bgcolor: "black" }} />

      {/* Nav */}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {/* Left */}
        <div className="col-md-auto">
          <IconButton>
            <BookmarkAddOutlinedIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </div>
        {/* Right */}
        <div className="col-md-auto">
          <IconButton>
            <MoreHorizIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </div>
      </Stack>

      <Divider sx={{ my: 2, borderBottomWidth: 1, bgcolor: "black" }} />

      {/* Add comment */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Add a comment
      </Typography>
      <TextField
        multiline
        rows={6}
        fullWidth
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{
          mb: 3,
          "& .MuiInputBase-input": {
            fontSize: "16px",
            padding: 1,
          },
        }}
      />
      <button className="rts-btn btn-primary" onClick={handleSubmit}>
        Comment
      </button>
    </Box>
  );
}

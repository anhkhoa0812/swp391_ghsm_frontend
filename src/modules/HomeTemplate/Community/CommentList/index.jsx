import {
  Box,
  Card,
  Typography,
  Divider,
  IconButton,
  TextField,
  Button,
  Pagination,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import avatar from "../../../../assets/PregnantAvatar.jpg";
import moment from "moment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import CommentActionMenu from "./CommentActionMenu";
import {
  useDeleteComment,
  useUpdateComment,
} from "../../../../apis/CallAPIComment";
import BackdropLoader from "../../../../component/BackdropLoader";
import { message as Message } from "antd";

export default function CommentList({ data, currentUser }) {
  const [comments, setComments] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");
  const [deletingCommentId, setDeletingCommentId] = useState(null);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  // State phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mở menu
  const handleMenuOpen = (event, comment) => {
    setAnchorEl(event.currentTarget);
    setSelectedComment(comment);
    setDeletingCommentId(comment.id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedComment(null);
  };

  // Call API để edit comment
  const handleSaveEdit = async () => {
    setLoading(true);
    try {
      const res = await useUpdateComment(editingCommentId, editedCommentText);
      if (res.code === 200) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === editingCommentId
              ? { ...comment, description: editedCommentText }
              : comment
          )
        );
        Message.success("Edited comment successfully!");
        setEditingCommentId(null);
        setEditedCommentText("");
        setSelectedComment(null);
        handleMenuClose();
      } else {
        console.error("Failed to update comment", res);
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    } finally {
      setLoading(false);
    }
  };

  // Khi nhấn "Edit" từ menu, chuyển comment sang chế độ chỉnh sửa
  const handleEditMenuClick = () => {
    if (selectedComment) {
      setEditingCommentId(selectedComment.id);
      setEditedCommentText(selectedComment.description);
    }
    handleMenuClose();
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedCommentText("");
  };

  // Call API để xóa comment
  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      const res = await useDeleteComment(deletingCommentId);
      if (res.code === 200) {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== deletingCommentId)
        );
        Message.success("Deleted comment successfully!");
        setDeletingCommentId(null);
      } else {
        console.error("Failed to delete comment", res);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setLoading(false);
      setOpenDeleteConfirm(false);
    }
  };

  const handleDeleteMenuClick = () => {
    setOpenDeleteConfirm(true);
    handleMenuClose();
  };

  const handleCancelDelete = () => {
    setOpenDeleteConfirm(false);
  };

  // Cập nhật comments khi data thay đổi
  useEffect(() => {
    if (data?.blogComments) {
      setComments(data.blogComments);
      // Reset trang nếu dữ liệu mới thay đổi
      setCurrentPage(1);
    }
  }, [data.blogComments]);

  // Tính toán danh sách comment hiển thị theo trang
  const indexOfLastComment = currentPage * itemsPerPage;
  const indexOfFirstComment = indexOfLastComment - itemsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  return (
    <Box>
      <BackdropLoader open={loading} />
      {comments.length > 0 ? (
        <>
          {currentComments.map((comment) => (
            <Card key={comment?.id} sx={{ mb: 2, p: 2, position: "relative" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <img
                    src={avatar}
                    alt="Avatar of member"
                    style={{ width: 50, borderRadius: "50%" }}
                  />
                  <Box>
                    <Typography variant="h5" fontWeight="bold">
                      {comment?.user?.fullName || "Unknown User"}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {moment(comment?.datePublish).format("MMMM D, YYYY")}
                    </Typography>
                  </Box>
                </Box>
                {/* Hiển thị nút MoreHoriz nếu comment thuộc về user hiện tại */}
                {comment?.user?.email === currentUser.email && (
                  <IconButton onClick={(e) => handleMenuOpen(e, comment)}>
                    <MoreHorizIcon />
                  </IconButton>
                )}
              </Box>
              {editingCommentId === comment.id ? (
                <>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={editedCommentText}
                    onChange={(e) => setEditedCommentText(e.target.value)}
                    sx={{
                      mt: 2,
                      "& .MuiInputBase-input": {
                        fontSize: "16px",
                        padding: 1,
                      },
                    }}
                  />
                  <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      onClick={handleSaveEdit}
                      sx={{
                        mt: 1,
                        p: 1.5,
                        fontSize: 12,
                        backgroundColor: "#615EFC",
                        color: "#FFFFFF",
                        "&:hover": {
                          backgroundColor: "#5045D9",
                        },
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleCancelEdit}
                      sx={{
                        mt: 1,
                        p: 1.5,
                        fontSize: 12,
                        borderColor: "#615EFC",
                        color: "#615EFC",
                        "&:hover": {
                          borderColor: "#5045D9",
                          backgroundColor: "#f0f0f0",
                        },
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </>
              ) : (
                <Typography variant="h5" sx={{ mt: 2 }}>
                  {comment?.description || "No content"}
                </Typography>
              )}
              <Divider sx={{ my: 2, borderBottomWidth: 1, bgcolor: "black" }} />
            </Card>
          ))}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <Pagination
              count={Math.ceil(comments.length / itemsPerPage)}
              page={currentPage}
              onChange={(event, value) => {
                setCurrentPage(value);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              color="primary"
            />
          </Box>
        </>
      ) : (
        <Typography variant="h6" color="text.secondary" textAlign="center">
          No comments available
        </Typography>
      )}

      <CommentActionMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        handleClose={handleMenuClose}
        handleEdit={handleEditMenuClick}
        handleDelete={handleDeleteMenuClick}
      />

      <DeleteConfirmationDialog
        open={openDeleteConfirm}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}

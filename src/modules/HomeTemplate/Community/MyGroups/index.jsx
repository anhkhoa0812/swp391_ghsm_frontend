import { Box, Card, Typography, Pagination, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import avatar from "../../../../assets/PregnantAvatar.jpg";
import {
  useGetMyGroupList,
  useDeleteGroup,
} from "../../../../apis/CallAPIGroup";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../../component/SearchBar";
import AddGroupDialog from "./AddGroupDialog";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { message as Message } from "antd";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import BackdropLoader from "../../../../component/BackdropLoader";
import { useGetImageUrl } from "../../../../apis/CallAPIFirebase";

export default function MyGroups() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const groupsPerPage = 5;

  // State cho modal xác nhận xóa
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [groupIdToDelete, setGroupIdToDelete] = useState(null);

  // Lấy danh sách group khi mới vào trang
  const handleGetMyGroups = async () => {
    setLoading(true);
    const res = await useGetMyGroupList();
    if (res.code === 200) {
      // Sau đó cập nhật ảnh cho từng group
      const groupsWithImages = await handleGetImages(res.data);
      setGroups(groupsWithImages);
      setFilteredGroups(groupsWithImages);
    }
    setLoading(false);
  };

  // Lấy danh sách ảnh của các group
  const handleGetImages = async (groupsData) => {
    const updatedGroups = await Promise.all(
      groupsData.map(async (group) => {
        try {
          const url = await useGetImageUrl(
            "pregnancyCareImages/groups",
            group.id
          );
          return { ...group, imageUrl: url };
        } catch (error) {
          console.log(error);
          return { ...group, imageUrl: group.imageUrl || avatar };
        }
      })
    );
    return updatedGroups;
  };

  const handleCardClick = (groupId) => {
    navigate(`/community/group/${groupId}`);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredGroups(groups);
    } else {
      const lowerCasedSearchTerm = searchTerm.toLowerCase();
      const filtered = groups.filter((group) =>
        group.name.toLowerCase().includes(lowerCasedSearchTerm)
      );
      setFilteredGroups(filtered);
    }
    setCurrentPage(1);
  };

  // Callback khi thêm group mới từ AddGroupDialog
  const handleGroupAdded = (newGroup) => {
    setGroups((prevGroups) => [newGroup, ...prevGroups]);
    setFilteredGroups((prevGroups) => [newGroup, ...prevGroups]);
    setCurrentPage(1);
  };

  // Mở modal xác nhận xóa
  const handleOpenDeleteDialog = (groupId) => {
    setGroupIdToDelete(groupId);
    setOpenDeleteDialog(true);
  };

  // Hàm xác nhận xóa group
  const handleConfirmDelete = async () => {
    if (!groupIdToDelete) return;
    try {
      const res = await useDeleteGroup(groupIdToDelete);
      if (res.code === 200) {
        Message.success("Group deleted successfully!");
        setGroups((prev) =>
          prev.filter((group) => group.id !== groupIdToDelete)
        );
        setFilteredGroups((prev) =>
          prev.filter((group) => group.id !== groupIdToDelete)
        );
      } else {
        Message.error("Failed to delete group");
      }
    } catch (error) {
      console.error("Error deleting group:", error);
      Message.error("Error deleting group");
    } finally {
      setOpenDeleteDialog(false);
      setGroupIdToDelete(null);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    handleGetMyGroups();
  }, []);

  // Phân trang
  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
  const currentGroups = filteredGroups.slice(
    indexOfFirstGroup,
    indexOfLastGroup
  );
  const totalPages = Math.ceil(filteredGroups.length / groupsPerPage);

  return (
    <Box sx={{ p: 3, backgroundColor: "#FFFFFF" }}>
      <BackdropLoader open={loading} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h3" fontWeight="bold" sx={{ color: "#201F57" }}>
          My Groups
        </Typography>
        <AddGroupDialog onGroupAdded={handleGroupAdded} />
      </Box>
      <SearchBar onSearch={handleSearch} placeholder="Search groups..." />
      {currentGroups
        .filter((group) => group !== undefined)
        .map((group) => (
          <Card
            key={group.id}
            sx={{
              mb: 2,
              p: 2,
              cursor: "pointer",
              transition: "border 0.3s ease, transform 0.3s ease",
              border: "1px solid transparent",
              backgroundColor: "#FFFFFF",
              position: "relative",
              "&:hover": {
                border: "1px solid #615EFC",
                transform: "scale(1.02)",
              },
              "&:active": {
                opacity: "0.8",
              },
            }}
            onClick={() => handleCardClick(group.id)}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ width: 70 }}>
                <img
                  src={group.imageUrl || avatar}
                  alt="Avatar of group"
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </Box>
              <Box>
                <Typography variant="h5" gutterBottom sx={{ color: "#201F57" }}>
                  {group.name}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {group.users.length} members .{" "}
                  {moment(group.date).format("MMMM D, YYYY")}
                </Typography>
              </Box>
            </Box>
            {/* Nút Delete nằm ở góc phải trên của Card */}
            <Box sx={{ position: "absolute", top: 8, right: 8 }}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDeleteDialog(group.id);
                }}
                sx={{ color: "#201F57" }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Box>
          </Card>
        ))}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#201F57",
              },
              "& .Mui-selected": {
                backgroundColor: "#615EFC",
                color: "#FFFFFF",
              },
            }}
          />
        </Box>
      )}
      <DeleteConfirmationDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Group"
        content="Are you sure you want to delete this group?"
      />
    </Box>
  );
}

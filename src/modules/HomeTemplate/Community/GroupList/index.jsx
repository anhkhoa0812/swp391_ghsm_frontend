import { Box, Card, Typography, Pagination, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import Avatar from "../../../../assets/PregnantAvatar.jpg";
import { useGetGroupList } from "../../../../apis/CallAPIGroup";
import moment from "moment";
import BackdropLoader from "../../../../component/BackdropLoader";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../../component/SearchBar";
import { motion } from "framer-motion";
import { ButtonBase } from "@mui/material";

export default function GroupList() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const groupsPerPage = 5;

  useEffect(() => {
    const handleGetAllGroups = async () => {
      setLoading(true);
      const res = await useGetGroupList();
      if (res.code === 200) {
        setGroups(res.data);
        setFilteredGroups(res.data);
      }
      setLoading(false);
    };
    handleGetAllGroups();
  }, []);

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

  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
  const currentGroups = filteredGroups.slice(
    indexOfFirstGroup,
    indexOfLastGroup
  );
  const totalPages = Math.ceil(filteredGroups.length / groupsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box>
      <BackdropLoader open={loading} />
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Group List
      </Typography>
      <SearchBar onSearch={handleSearch} placeholder="Search groups..." />

      {/* Hiển thị Skeleton khi loading */}
      {loading &&
        Array.from(new Array(groupsPerPage)).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            height={80}
            sx={{ my: 2, borderRadius: 2 }}
          />
        ))}

      {/* Danh sách Group */}
      {!loading &&
        currentGroups.map((group) => (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            key={group.id}
          >
            <ButtonBase
              onClick={() => handleCardClick(group.id)}
              sx={{ width: "100%" }}
            >
              <Card
                sx={{
                  mb: 2,
                  p: 2,
                  width: "100%",
                  transition: "all 0.3s ease-in-out",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  "&:hover": {
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <div className="row justify-content-md-center">
                  <div className="col-md-auto col-2" style={{ width: 70 }}>
                    <img
                      src={Avatar}
                      alt="Avatar of group"
                      style={{ width: "100%", borderRadius: "50%" }}
                    />
                  </div>
                  <div className="col">
                    <Typography variant="h5" gutterBottom>
                      {group.name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {group.users.length} members •{" "}
                      {moment(group.date).format("MMMM D, YYYY")}
                    </Typography>
                  </div>
                </div>
              </Card>
            </ButtonBase>
          </motion.div>
        ))}

      {/* Phân trang */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
}

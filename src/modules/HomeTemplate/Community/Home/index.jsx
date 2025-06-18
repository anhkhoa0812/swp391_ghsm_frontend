import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Avatar,
  IconButton,
  Divider,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useGetPosts } from "../../../../apis/CallAPIBlog";
import moment from "moment/moment";
import BackdropLoader from "../../../../component/BackdropLoader";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../../component/SearchBar";

export default function Home() {
  const [sortBy, setSortBy] = useState("newest");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const navigate = useNavigate();

  // Gọi API để lấy danh sách bài viết
  const handleGetPosts = async () => {
    setLoading(true);
    try {
      const res = await useGetPosts();
      if (res.code === 200) {
        setPosts(res.data);
        setFilteredPosts(res.data); // Ban đầu filteredPosts bằng với posts
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetPosts();
  }, []);

  // Hàm xử lý tìm kiếm
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredPosts(posts);
    } else {
      const lowerCasedSearchTerm = searchTerm.toLowerCase();
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(lowerCasedSearchTerm) ||
          post.description.toLowerCase().includes(lowerCasedSearchTerm)
      );
      setFilteredPosts(filtered);
    }
    setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
  };

  // Sắp xếp bài viết theo thứ tự "newest" hoặc "oldest"
  const sortedPosts = filteredPosts.slice().sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.datePublish) - new Date(a.datePublish);
    } else {
      return new Date(a.datePublish) - new Date(b.datePublish);
    }
  });

  // Logic phân trang
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Hàm xử lý chuyển trang khi nhấn vào Card
  const handleCardClick = (postId) => {
    navigate(`/community/post-detail/${postId}`);
  };

  return (
    <Box>
      <BackdropLoader open={loading} />

      {/* Sticky header với hiệu ứng fadeInDown */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 999,
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          p: 2,
          mb: 2,
          animation: "fadeInDown 0.5s ease-in-out",
          "@keyframes fadeInDown": {
            "0%": { opacity: 0, transform: "translateY(-20px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          Posts in my groups
        </Typography>
        <SearchBar onSearch={handleSearch} placeholder="Search posts..." />
        <FormControl sx={{ mt: 2, width: 150 }}>
          <InputLabel id="sort-by" sx={{ fontSize: 12 }}>
            Sort by
          </InputLabel>
          <Select
            value={sortBy}
            displayEmpty
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
            labelId="sort-by"
            label="Sort by"
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {currentPosts.length > 0 ? (
        currentPosts.map((post) => (
          <Card
            key={post.id}
            sx={{
              mb: 2,
              p: 2,
              cursor: "pointer",
              transition:
                "border 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
              border: "1px solid transparent",
              overflow: "hidden",
              "&:hover": {
                border: "1px solid #615EFC",
                transform: "scale(1.02)",
                boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
              },
              "&:active": {
                opacity: "0.5",
              },
            }}
            onClick={() => handleCardClick(post.id)}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              {post.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Avatar sx={{ width: 30, height: 30 }} />
              <Typography variant="h6">
                By <strong>{post.user.fullName}</strong> in{" "}
                <strong>{post.group.name}</strong>
              </Typography>
            </Box>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
              {post.description}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {moment(post.datePublish).format("MMMM D, YYYY")}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton size="small" disabled>
                  <ChatBubbleOutlineIcon fontSize="large" />
                </IconButton>
                <Typography variant="h6">{post.blogComments.length}</Typography>
              </Box>
              <IconButton size="large" sx={{ width: 40 }}>
                <MoreHorizIcon fontSize="large" />
              </IconButton>
            </Box>
          </Card>
        ))
      ) : (
        <Typography variant="h5">No post available</Typography>
      )}

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

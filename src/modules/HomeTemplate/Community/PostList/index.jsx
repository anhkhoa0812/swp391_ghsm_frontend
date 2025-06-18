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
  TextField,
  InputAdornment,
  Pagination,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment";

export default function PostList({ group }) {
  const [sortBy, setSortBy] = useState("newest");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const postsPerPage = 5; // Số bài viết mỗi trang

  useEffect(() => {
    setPosts(group?.blogs || []);
  }, [group]);

  // Khi nhấn Enter trong thanh tìm kiếm
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(searchInput);
      setPage(1); // Reset trang về 1 khi tìm kiếm
    }
  };

  // Lọc bài viết dựa trên từ khóa nhập vào (title và description)
  const filteredPosts = posts.filter((post) => {
    const term = searchTerm.toLowerCase();
    return (
      post?.title.toLowerCase().includes(term) ||
      post?.description.toLowerCase().includes(term)
    );
  });

  // Sắp xếp bài viết theo ngày (sử dụng trường datePublish)
  const sortedPosts = filteredPosts.sort((a, b) => {
    const dateA = new Date(a.datePublish);
    const dateB = new Date(b.datePublish);
    return sortBy === "newest" ? dateB - dateA : dateA - dateB;
  });

  // Tính toán chỉ số bài viết hiển thị của trang hiện tại
  const indexOfLastPost = page * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Xử lý thay đổi trang và cuộn lên đầu trang
  const handleChangePage = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Posts in this group
      </Typography>

      {/* Thanh tìm kiếm */}
      <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
        <TextField
          variant="outlined"
          placeholder="Search for posts in this group..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Dropdown sắp xếp */}
      <FormControl sx={{ mb: 2, width: 150 }}>
        <InputLabel id="sort-by" sx={{ fontSize: 12 }}>
          Sort by
        </InputLabel>
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          labelId="sort-by"
          label="Sort by"
        >
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
        </Select>
      </FormControl>

      {/* Danh sách bài viết */}
      {currentPosts.map((post) => (
        <Card key={post?.id} sx={{ mb: 2, p: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            {post?.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Avatar sx={{ width: 30, height: 30 }} />
            <Typography variant="h6">By {post?.user.fullName}</Typography>
          </Box>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
            {post?.description}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {moment(post?.datePublish).format("MMMM DD, YYYY")}
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
              <IconButton size="large" disabled>
                <ChatBubbleOutlineIcon fontSize="large" />
              </IconButton>
              <Typography variant="h5">{post?.blogComments.length}</Typography>
            </Box>
            <IconButton size="large" sx={{ width: 60 }}>
              <MoreHorizIcon fontSize="large" sx={{ width: 70 }} />
            </IconButton>
          </Box>
        </Card>
      ))}

      {/* Phân trang */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={Math.ceil(sortedPosts.length / postsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Box>
  );
}

import { Box, Typography, Link, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetMyPosts } from "../../../../apis/CallAPIBlog";
import BackdropLoader from "../../../../component/BackdropLoader";
import moment from "moment";
import { useGetMyComments } from "../../../../apis/CallAPIComment";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Activity() {
  const [loading, setLoading] = useState(false);
  // Post List
  const [posts, setPosts] = useState([]);
  // Comment List
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();

  const handleGetMyPosts = async () => {
    setLoading(true);
    const res = await useGetMyPosts();
    if (res.code === 200) {
      setPosts(res.data);
    }
    setLoading(false);
  };

  const handleGetMyComments = async () => {
    setLoading(true);
    const res = await useGetMyComments();
    if (res.code === 200) {
      setComments(res.data);
    }
    setLoading(false);
  };

  const handlePostClick = (postId) => {
    navigate(`/community/post-detail/${postId}`);
  };

  const handleGroupClick = (groupId) => {
    navigate(`/community/group/${groupId}`);
  };

  useEffect(() => {
    handleGetMyPosts();
    handleGetMyComments();
  }, []);

  const linkSx = {
    cursor: "pointer",
    color: "primary.main",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
      color: "primary.dark",
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <BackdropLoader open={loading} />
      {/* Title */}
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Browse your activity
      </Typography>
      {/* My post button and My comment button */}
      <div className="row">
        <div className="col-2">
          <Link
            href="#"
            underline="hover"
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById("my-posts");
              if (target) {
                const offset = 170;
                const targetPosition =
                  target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: targetPosition, behavior: "smooth" });
              }
            }}
          >
            My posts
          </Link>
        </div>
        <div className="col-8">
          <Link
            href="#"
            underline="hover"
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById("my-comments");
              if (target) {
                const offset = 180;
                const targetPosition =
                  target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: targetPosition, behavior: "smooth" });
              }
            }}
          >
            My comments
          </Link>
        </div>
      </div>

      <Divider sx={{ my: 2, borderBottomWidth: 1, bgcolor: "black" }} />

      {/* My post list */}
      <Box mb={5}>
        <Typography id="my-posts" variant="h4" fontWeight="bold" gutterBottom>
          My posts
        </Typography>
        {posts.map((post) => (
          <motion.div key={post.id} variants={itemVariants}>
            <Typography variant="h5">
              created post{" "}
              <Link sx={linkSx} onClick={() => handlePostClick(post.id)}>
                "{post.title}"
              </Link>{" "}
              in group{" "}
              <Link sx={linkSx} onClick={() => handleGroupClick(post.group.id)}>
                "{post.group.name}"
              </Link>
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {moment(post.datePublish).format("MMMM D, YYYY")}
            </Typography>
            <Divider sx={{ my: 2, borderBottomWidth: 1, bgcolor: "black" }} />
          </motion.div>
        ))}
      </Box>

      {/* My comment list */}
      <Box mb={5}>
        <Typography
          id="my-comments"
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          My comments
        </Typography>
        {comments.map((comment) => (
          <motion.div key={comment.id} variants={itemVariants}>
            <Typography variant="h5">
              commented on post{" "}
              <Link
                sx={linkSx}
                onClick={() => handlePostClick(comment.blog.id)}
              >
                "{comment.blog.title}"
              </Link>{" "}
              in group{" "}
              <Link
                sx={linkSx}
                onClick={() => handleGroupClick(comment.blog.group.id)}
              >
                "{comment.blog.group.name}"
              </Link>
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {moment(comment.datePublish).format("MMMM D, YYYY")}
            </Typography>
            <Divider sx={{ my: 2, borderBottomWidth: 1, bgcolor: "black" }} />
          </motion.div>
        ))}
      </Box>
    </motion.div>
  );
}

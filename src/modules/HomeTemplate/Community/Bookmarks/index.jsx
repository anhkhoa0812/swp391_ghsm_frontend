import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Link,
  Box,
  Avatar,
  Divider,
  IconButton,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([
    {
      id: 1,
      title: "Postpartum hemorrhoids",
      author: "Getzy",
      group: "December 2024 Birth Club",
      content:
        "TMI, but I’m desperate and need some help if possible, I’m experiencing such painful hemorrhoids that flare up after every bowel movement...",
      time: "14 minutes ago",
      comments: 1,
      likes: 0,
    },
    {
      id: 2,
      title: "Never goes as planned",
      author: "oopsyIdiditagain",
      group: "Baby Names",
      content:
        "So I have decided to stick with the name Emrys Mae. Until my cousin asked me if I would change the middle because her daughter’s middle name...",
      time: "15 minutes ago",
      comments: 10,
      likes: 0,
    },
  ]);
  const [isManaging, setIsManaging] = useState(false);

  const handleRemove = (selected) => {
    setBookmarks((prev) =>
      prev.filter((_, index) => !selected.includes(index))
    );
    setIsManaging(false);
  };

  return bookmarks.length === 0 ? (
    <EmptyBookmarks />
  ) : isManaging ? (
    <ManageBookmarks
      bookmarks={bookmarks}
      onRemove={handleRemove}
      onCancel={() => setIsManaging(false)}
    />
  ) : (
    <BookmarksList bookmarks={bookmarks} onManage={() => setIsManaging(true)} />
  );
}

function EmptyBookmarks() {
  return (
    <Box>
      <Typography variant="h3">My Bookmarks</Typography>
      <Card style={{ margin: "20px auto", padding: "20px" }}>
        <CardContent sx={{ width: "100%" }}>
          <Typography variant="h5" style={{ color: "#999" }}>
            You have no bookmarks
          </Typography>
          <Typography variant="h5" style={{ color: "#777" }}>
            Need some inspiration? Browse more posts on{" "}
            <Link href="/" underline="hover">
              home page
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

function BookmarksList({ bookmarks, onManage }) {
  return (
    <Box>
      <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
        My Bookmarks
      </Typography>
      {/* Manage Button */}
      <Box display="flex" justifyContent="flex-end">
        <button className="rts-btn btn-primary" onClick={onManage}>
          Manage
        </button>
      </Box>
      {/* Bookmak List */}
      {bookmarks.map((bookmark, index) => (
        <Card key={index} style={{ margin: "10px 0", padding: "10px" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            {bookmark.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Avatar sx={{ width: 24, height: 24 }} />
            <Typography variant="body1">
              By <strong>{bookmark.author}</strong> in{" "}
              <strong>{bookmark.group}</strong>
            </Typography>
          </Box>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
            {bookmark.content}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {bookmark.time}
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
              {/* Comment Icon */}
              <IconButton size="small" disabled>
                <ChatBubbleOutlineIcon fontSize="small" />
              </IconButton>
              <Typography variant="body1">{bookmark.comments}</Typography>
              {/* Like Ion */}
              <IconButton size="small" disabled>
                <FavoriteBorderIcon fontSize="small" />
              </IconButton>
              <Typography variant="body1">{bookmark.likes}</Typography>
            </Box>
          </Box>
        </Card>
      ))}
    </Box>
  );
}

function ManageBookmarks({ bookmarks, onRemove, onCancel }) {
  const [selected, setSelected] = useState([]);

  const handleSelect = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
        My Bookmarks
      </Typography>
      {/* Cancel Button */}
      <Box display="flex" justifyContent="flex-end">
        <button className="rts-btn btn-primary" onClick={onCancel}>
          Cancel
        </button>
      </Box>

      {bookmarks.map((bookmark, index) => (
        <Card
          key={index}
          style={{
            margin: "10px 0",
            padding: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Bootstrap Checkbox */}
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input bg-primary"
              id={`bookmark-${index}`}
              checked={selected.includes(index)}
              onChange={() => handleSelect(index)}
            />
            <label className="form-check-label" htmlFor={`bookmark-${index}`} />
          </div>

          <CardContent>
            <Typography variant="h4" gutterBottom>
              {bookmark.title}
            </Typography>
            <Typography variant="h5" color="textSecondary" gutterBottom>
              {bookmark.content}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              By {bookmark.author}
            </Typography>
          </CardContent>
        </Card>
      ))}

      {/* Remove Button */}
      <div class="row justify-content-md-center my-5">
        <div class="col-md-auto">
          <Button
            variant="contained"
            color="error"
            onClick={() => onRemove(selected)}
            disabled={!selected.length}
            sx={{
              width: 100,
              height: 50,
              fontSize: 13,
              fontWeight: "bold",
              borderRadius: 20,
            }}
          >
            Remove
          </Button>
        </div>
      </div>
    </Box>
  );
}

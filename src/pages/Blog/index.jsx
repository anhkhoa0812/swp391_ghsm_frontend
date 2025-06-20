import React, { useState, useEffect } from "react";
import "./index.css"; // Import CSS từ file index.css
import { Modal, Button } from "react-bootstrap";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Get token from USER_TOKEN in localStorage
const getToken = () => {
  const user = localStorage.getItem('USER_TOKEN');
  return user ? JSON.parse(user).token : null;
};

export default function BlogPages() {
  const [blogs, setBlogs] = useState([]);
  const [modalPost, setModalPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch list of blogs on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/get-blogs`, {
          method: 'GET',
          headers: {
            'accept': '*/*',
            ...(getToken() && { 'Authorization': `Bearer ${getToken()}` })
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setBlogs(data.data); // Store the blog list from API
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Fetch single blog when "Read more" is clicked
  const handleOpenModal = async (blogId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/get-blog?blogId=${blogId}`, {
        method: 'GET',
        headers: {
          'accept': '*/*',
          ...(getToken() && { 'Authorization': `Bearer ${getToken()}` })
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setModalPost(data.data); // Store the blog details
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalPost(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1>Blog Sharing Knowledge</h1>
        <p>
          Sharing insights about sex education, reproductive health care, and
          sexual wellness.
        </p>
      </div>

      <div className="blog-posts">
        {blogs.map((post) => (
          <div className="blog-card" key={post.id}>
            <div className="blog-image">
              <img src={post.image} alt={post.title} />
            </div>
            <div className="blog-content">
              <h3>{post.title}</h3>
              <button
                className="view-full"
                onClick={() => handleOpenModal(post.id)}
              >
                Read more
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && modalPost && (
        <Modal show={isModalOpen} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{modalPost.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Our Commitment</h4>
            <p>{modalPost.content}</p>
            <img src={modalPost.image} alt={modalPost.title} style={{ maxWidth: '100%' }} />
            <p><strong>Author:</strong> {modalPost.author.fullName}</p>
            <p><strong>Date:</strong> {new Date(modalPost.createAt).toLocaleDateString()}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
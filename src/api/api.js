const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Get token from USER_TOKEN in localStorage
const getToken = () => {
  const user = localStorage.getItem('USER_TOKEN');
  return user ? JSON.parse(user).token : null;
};

const api = {
  // Get list of blogs
  getBlogs: async () => {
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
      return data;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error.message;
    }
  },

  // Get a single blog by blogId
  getBlog: async (blogId) => {
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
      return data;
    } catch (error) {
      console.error('Error fetching blog:', error);
      throw error.message;
    }
  }
};

export default api;
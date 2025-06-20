const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const getToken = () => localStorage.getItem('accessToken');

const authApi = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/Authen/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message || 'Something went wrong during login');
    }
  },

  register: async (fullName, email, password, roleId, phoneNumber, gender) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/Authen/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          fullName, 
          email, 
          password, 
          roleId, 
          phoneNumber, 
          gender 
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message || 'Something went wrong during registration');
    }
  },
};

export default authApi;
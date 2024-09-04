const API_URL = process.env.REACT_APP_API_URL;

export const apiRequest = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(`${API_URL}${url}`)}`,
      options
    );
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
  }
};

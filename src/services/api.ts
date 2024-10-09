const API_URL = process.env.REACT_APP_API_URL;

export const apiRequest = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(`${API_URL}${url}`)}`,
      { ...options }
    );
    if (!response.ok) {
      const errorMessage = `Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.warn('Fetch aborted by user');
    } else if (error instanceof TypeError) {
      throw new Error('Network error. Please check your connection.');
    } else if (error instanceof Error) {
      throw new Error(error.message || 'An unknown error occurred.');
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};

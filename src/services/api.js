import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '30925450-e74dba54a3b0c628a6a6e8d3f';

export const fetchImages = async (searchValue, page) => {
  const response = await axios.get(
    `?q=${searchValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response;
};

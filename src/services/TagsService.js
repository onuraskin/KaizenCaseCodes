import axios from 'axios';

const TagsService = {
  getTags: async () => {
    try {
      const response = await axios.get('https://api.extrazone.com/tags/list', {
        headers: {
          'Content-Type': 'application/json',
          'X-Country-Id': 'TR',
          'X-Language-Id': 'TR',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  },
};

export default TagsService;

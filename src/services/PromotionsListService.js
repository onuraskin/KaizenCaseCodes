import axios from 'axios';

const PromotionsListService = {
  getPromotionsList: async () => {
    try {
      const response = await axios.get(
        'https://api.extrazone.com/promotions/list?Channel=PWA',
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Country-Id': 'TR',
            'X-Language-Id': 'TR',
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching promotions list:', error);
      throw error;
    }
  },
};

export default PromotionsListService;

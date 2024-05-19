import axios from 'axios';

const PromotionService = {
  getPromotion: async id => {
    try {
      const response = await axios.get(
        `https://api.extrazone.com/promotions?Id=${id}`,
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
      console.error('Error fetching promotion:', error);
      throw error;
    }
  },
};

module.exports = PromotionService;

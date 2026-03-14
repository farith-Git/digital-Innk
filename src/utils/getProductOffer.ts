export const getProductOffer = (productName: string) => {

  const offers: any = {
    cheese: {
      type: "buy_one_get_one",
      discount: 0,
      description: "Buy One Get One Free"
    },

    bread: {
      type: "half_price",
      discount: 50,
      description: "Half Price With Soup"
    },

    butter: {
      type: "third_off",
      discount: 33.33,
      description: "One Third Off"
    }
  };

  return offers[productName.toLowerCase()] || null;
};
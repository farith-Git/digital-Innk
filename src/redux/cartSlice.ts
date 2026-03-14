import { createSlice } from "@reduxjs/toolkit";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  offer?: {
    description: string;
    discount: number;
    type: "flat" | "percentage";
  };
  specialOffer?: {
    description: string;
    discount: number;
    type: "flat" | "percentage";
  };
};

const cartSlice = createSlice({
    name: "cart",
    initialState: [] as CartItem[],
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existing = state.find((item) => item.id === product.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    specialOffer: product.specialOffer
                });
            }
        },

        increaseQuantity: (state, action) => {
            const productId = action.payload;
            const item = state.find((i) => i.id === productId);
            if (item) {
                item.quantity += 1;
            }
        },

        decreaseQuantity: (state, action) => {
            const productId = action.payload;
            const item = state.find((i) => i.id === productId);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },

        removeQuantity: (state, action) => {
            const productId = action.payload;
            return state.filter((item) => item.id !== productId)
        },
        clearCart: () => {
            return [];
        }
    },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
import { createContext } from "react";

const CartContext = createContext({
    cart: null,
    cartCount: null,
    addToCart: async () => {},
    fetchCart: async () => {},
    updateCartItem: async() => {},
    removeCartItem: async() => {},
    setCart: () => {}
});

export default CartContext
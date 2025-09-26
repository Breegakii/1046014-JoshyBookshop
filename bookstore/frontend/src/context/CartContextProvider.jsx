import { useEffect, useState } from "react";
import cartApi from "../api/cart";
import CartContext from "./CartContext";
import cartStorage from "../cart/storage";
import { toast } from "react-toastify";

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const fetchCart = async () => {
    try {
      const cartId = cartStorage.getCartId();
      if (!cartId) {
        setCart([])
        setCartCount(0)
        return
      };
      const response = await cartApi.getCart(cartId);
      console.log("response fetchcart", response)
      setCart(response.data);
      setCartCount(
        response.data.items.reduce((total, item) => total + item.quantity, 0)
      );
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      // Check if cart exists first
      let cartId = cartStorage.getCartId();

      if (!cartId || cartId === "undefined") {
        const newCart = await createCart();
        cartId = newCart;
        cartStorage.storeCartId(cartId);
        console.log("New cart created:", cartId);
      } else {
        console.log("Existing cart found:", cartId);
      }

      // Add item to cart
      await cartApi.addCartItem(cartId, productId, quantity);
      await fetchCart(); // Refresh cart data

      // Success feedback
      toast.success(
        `${quantity} ${quantity > 1 ? "items" : "item"} added to cart`
      );
    } catch (error) {
      console.error("Error in addToCart:", error);
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  const createCart = async () => {
    try {
      const response = await cartApi.createCart();
      cartStorage.storeCartId(response.data.id);
      return response.data.id;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      const cartId = cartStorage.getCartId();
      if (!cartId) return;
      if (quantity <= 0) return await removeCartItem(itemId)
      const response = await cartApi.updateCartItem(cartId, itemId, quantity);
      if (response.status === 200) {
        toast.success("Product updated in cart successfully");
        await fetchCart();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating item");
    }
  };

  const removeCartItem = async (itemId) => {
    try {
      const cartId = cartStorage.getCartId();
      if (!cartId) return;
      const response = await cartApi.removeCartItem(cartId, itemId);
      if (response.status === 204) {
        toast.success("Item removed from cart successfully");
        await fetchCart();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while removing item from cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        fetchCart,
        updateCartItem,
        removeCartItem,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

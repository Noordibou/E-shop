import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";

interface CartItem {
  _id: string;
  quantity: number;
    name: string;
    desc: string;
    category: string;
    price: number;
    image: string;
    featured: boolean;


}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  toggleCart: () => void;
  addToCart: (newItem: CartItem) => void;
  removeCartItem: (cartItem: CartItem) => void;
  fetchCartItems: () => void;
}

const cartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const addToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const itemExists = prev.find((item) => item._id === newItem._id);

      if (itemExists) {
        const updatedItem = { ...itemExists, quantity: itemExists.quantity + newItem.quantity };

        const newArray = prev.map((item) => {
          return item._id === newItem._id ? updatedItem : item;
        });

        return newArray;
      } else {
        return [...prev, newItem];
      }
    });
  };

  const removeCartItem = (cartItem: CartItem) => {
    setCartItems((prev) => {
      return prev.filter((item) => item._id !== cartItem._id);
    });
  };

  const fetchCartItems = async () => {
    try {
      // Replace with your actual API endpoint for fetching cart items
      const response = await axios.get<CartItem[]>("http://localhost:3000//api/cart"); // Example endpoint

      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    // Fetch initial cart items when the component mounts
    fetchCartItems();
  }, []);

  return (
    <cartContext.Provider
      value={{
        cartItems,
        toggleCart,
        isCartOpen,
        addToCart,
        removeCartItem,
        fetchCartItems,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export function useCartContext() {
  const context = useContext(cartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}

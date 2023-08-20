import React, { createContext, useContext, useState, ReactNode } from "react";

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


  return (
    <cartContext.Provider
      value={{
        cartItems,
        toggleCart,
        isCartOpen,
        addToCart,
        removeCartItem,
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
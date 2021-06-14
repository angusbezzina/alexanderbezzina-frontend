import { useContext, createContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  // This is out own custom provider! We will store state (data) and functionality
  // (updaters) in here and anyone can access it via the consumer!

  const [cartOpen, setCartOpen] = useState(false);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }

  return (
    <LocalStateProvider
      value={{ cartOpen, setCartOpen, toggleCart, openCart, closeCart }}
    >
      {children}
    </LocalStateProvider>
  );
}

// Make a custom hook for accessing cart local state

function useCart() {
  const all = useContext(LocalStateContext);

  return all;
}

export { CartStateProvider, useCart };

import { useContext, createContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function SearchStateProvider({ children }) {
  // This is out own custom provider! We will store state (data) and functionality
  // (updaters) in here and anyone can access it via the consumer!

  const [searchOpen, setSearchOpen] = useState(false);

  function toggleSearch() {
    setSearchOpen(!searchOpen);
  }

  function closeSearch() {
    setSearchOpen(false);
  }

  function openSearch() {
    setSearchOpen(true);
  }

  return (
    <LocalStateProvider
      value={{
        searchOpen,
        setSearchOpen,
        toggleSearch,
        openSearch,
        closeSearch,
      }}
    >
      {children}
    </LocalStateProvider>
  );
}

// Make a custom hook for accessing search local state

function useSearch() {
  const all = useContext(LocalStateContext);

  return all;
}

export { SearchStateProvider, useSearch };

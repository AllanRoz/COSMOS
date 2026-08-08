import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('cosmos_favorites');
    return saved ? JSON.parse(saved) : {
      planets: [],
      missions: [],
      images: [],
      satellites: [],
      astronomy: []
    };
  });

  useEffect(() => {
    localStorage.setItem('cosmos_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (type, id) => {
    setFavorites((prev) => {
      const typeFavorites = prev[type] || [];
      const exists = typeFavorites.includes(id);
      return {
        ...prev,
        [type]: exists
          ? typeFavorites.filter((favId) => favId !== id)
          : [...typeFavorites, id]
      };
    });
  };

  const isFavorite = (type, id) => {
    return favorites[type]?.includes(id) || false;
  };

  const removeFavorite = (type, id) => {
    setFavorites((prev) => ({
      ...prev,
      [type]: (prev[type] || []).filter((favId) => favId !== id)
    }));
  };

  const getFavoritesByType = (type) => favorites[type] || [];

  const getAllFavorites = () => favorites;

  const clearAllFavorites = () => {
    setFavorites({
      planets: [],
      missions: [],
      images: [],
      satellites: [],
      astronomy: []
    });
  };

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      toggleFavorite, 
      isFavorite, 
      removeFavorite,
      getFavoritesByType,
      getAllFavorites,
      clearAllFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

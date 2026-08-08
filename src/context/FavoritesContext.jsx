import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

const DEFAULT_FAVORITES = {
  planets: [],
  missions: [],
  images: [],
  satellites: [],
  astronomy: []
};

const parseFavorites = (raw) => {
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return DEFAULT_FAVORITES;
    if (Array.isArray(parsed)) {
      return { ...DEFAULT_FAVORITES, planets: parsed };
    }
    return {
      planets: Array.isArray(parsed.planets) ? parsed.planets : [],
      missions: Array.isArray(parsed.missions) ? parsed.missions : [],
      images: Array.isArray(parsed.images) ? parsed.images : [],
      satellites: Array.isArray(parsed.satellites) ? parsed.satellites : [],
      astronomy: Array.isArray(parsed.astronomy) ? parsed.astronomy : []
    };
  } catch (err) {
    return DEFAULT_FAVORITES;
  }
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('cosmos_favorites');
    return saved ? parseFavorites(saved) : DEFAULT_FAVORITES;
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
    setFavorites({ ...DEFAULT_FAVORITES });
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

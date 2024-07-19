import React, { useState, useEffect } from 'react';
import Carte from '../components/Carte';
import { Recette } from '../type';

const Favoris: React.FC = () => {
  const [favorites, setFavorites] = useState<Recette[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const removeFromFavorite = (recetteId: number) => {
    const newFavorites = favorites.filter(fav => fav.id !== recetteId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <div>
      <h1 className="my-4 text-3xl font-bold">Mes Recettes Favorites</h1>
      <Carte
        recettes={favorites}
        addToFavorite={() => {}}
        removeFromFavorite={removeFromFavorite}
      />
    </div>
  );
};

export default Favoris;
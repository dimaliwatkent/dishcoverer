import React, { useState, useEffect } from "react";

// Define a type for the recipe data
interface Recipe {
  _id: string;
  title: string;
  author: string;
  categories: string[];
}

// Custom hook to get favorites from local storage
function useFavorites(): Recipe[] {
  const [favorites, setFavorites] = useState<Recipe[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return favorites;
}

const FavoritesList: React.FC = () => {
  const favorites = useFavorites();
  console.log(favorites);

  return (
    <div>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite._id}>
            <strong>{favorite.title}</strong> by {favorite.author} -{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;

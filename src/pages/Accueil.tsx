import React, { useState, useEffect, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import Carte from '../components/Carte';
import { Recette } from '../type';

export default function App() {
    const [recettes, setRecettes] = useState<Recette[]>([]);
    const [searchResults, setSearchResults] = useState<Recette[]>([]);
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");
    const [favorites, setFavorites] = useState<Recette[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(storedFavorites);
        fetchRecettes();
    }, []);

    const fetchRecettes = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3001/recettes');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setRecettes(data);
        } catch (err) {
            setError(`Une erreur est survenue lors du chargement des recettes: ${err instanceof Error ? err.message : String(err)}`);
        } finally {
            setIsLoading(false);
        }
    };

    const addToFavorite = (recette: Recette) => {
        const newFavorites = [...favorites, recette];
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    const removeFromFavorite = (recetteId: number) => {
        const newFavorites = favorites.filter(fav => fav.id !== recetteId);
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    const searchRecette = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query.trim().length < 3) {
            setError("Merci de taper un mot-clé de 3 caractères minimum");
            return;
        }

        setIsLoading(true);
        setError("");

        const filteredRecettes = recettes.filter((recette: Recette) => {
            const nomMatch = recette.nom && typeof recette.nom === 'string' && recette.nom.toLowerCase().includes(query.toLowerCase());
            const descriptionMatch = recette.description && typeof recette.description === 'string' && recette.description.toLowerCase().includes(query.toLowerCase());
            return nomMatch || descriptionMatch;
        });

        if (filteredRecettes.length === 0) {
            setSearchResults([]);
            setError("Aucune recette trouvée");
        } else {
            setSearchResults(filteredRecettes);
        }
        
        setHasSearched(true);
        setIsLoading(false);
    };

    return (
        <main>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1>Recette.com</h1>
            </motion.div>
            <motion.div>
                <h3 className="text-center">Trouvez les recettes de votre choix en 2 clics !</h3>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <form onSubmit={searchRecette}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                        placeholder="Rechercher une recette..."
                    />
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </button>
                </form>
                {isLoading && <p>Chargement...</p>}
                <p className="text-center text-red-500">{error}</p>
            </motion.div>

            {hasSearched && !isLoading && searchResults.length > 0 && (
                <Carte
                    recettes={searchResults}
                    addToFavorite={addToFavorite}
                    removeFromFavorite={removeFromFavorite}
                />
            )}
        </main>
    );
}
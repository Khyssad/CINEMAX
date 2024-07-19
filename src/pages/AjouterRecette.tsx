import React, { useState } from 'react';
import { Recette } from '../type';

const API_URL = 'https://api-recette-26n5.onrender.com/recettes';  // Ajustez l'URL selon votre configuration

const AjouterRecette: React.FC = () => {
  const [recette, setRecette] = useState<Omit<Recette, 'id'>>({
    nom: '',
    description: '',
    temps_preparation: 0,
    temps_cuisson: 0,
    difficulte: '',
    personnes: 0,
    ingredients: [],
    etapes: [],
    categorie: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRecette(prev => ({ ...prev, [name]: value }));
  };

  const handleIngredientsChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const { value } = e.target;
    const ingredients = [...recette.ingredients];
    ingredients[index] = value;
    setRecette(prev => ({ ...prev, ingredients }));
  };

  const handleEtapesChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const { value } = e.target;
    const etapes = [...recette.etapes];
    etapes[index] = value;
    setRecette(prev => ({ ...prev, etapes }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recette),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout de la recette');
      }

      const nouvelleRecette = await response.json();
      console.log('Recette ajoutée:', nouvelleRecette);

      setRecette({
        nom: '',
        description: '',
        temps_preparation: 0,
        temps_cuisson: 0,
        difficulte: '',
        personnes: 0,
        ingredients: [],
        etapes: [],
        categorie: ''
      });
      alert('Recette ajoutée avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la recette:', error);
      alert('Erreur lors de l\'ajout de la recette');
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Ajouter une nouvelle recette</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700" htmlFor="nom">
              Nom de la recette
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
              type="text"
              id="nom"
              name="nom"
              value={recette.nom}
              onChange={handleChange}
              required
              placeholder="Ex: Tarte aux pommes"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700" htmlFor="description">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              value={recette.description}
              onChange={handleChange}
              required
              placeholder="Ex: Un plat végétarien provençal savoureux et coloré"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700" htmlFor="temps_preparation">
              Temps de préparation (min)
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
              type="number"
              id="temps_preparation"
              name="temps_preparation"
              value={recette.temps_preparation}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700" htmlFor="temps_cuisson">
              Temps de cuisson (min)
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
              type="number"
              id="temps_cuisson"
              name="temps_cuisson"
              value={recette.temps_cuisson}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700" htmlFor="difficulte">
              Difficulté
            </label>
            <select
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
              id="difficulte"
              name="difficulte"
              value={recette.difficulte}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionnez une difficulté</option>
              <option value="Facile">Facile</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Difficile">Difficile</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700" htmlFor="personnes">
              Nombre de personnes
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
              type="number"
              id="personnes"
              name="personnes"
              value={recette.personnes}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700" htmlFor="ingredients">
              Ingrédients
            </label>
            {recette.ingredients.map((ingredient, index) => (
              <textarea
                key={index}
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                value={ingredient}
                onChange={e => handleIngredientsChange(e, index)}
                required
                placeholder={`Ingrédient ${index + 1}`}
              />
            ))}
            <button
              className="px-4 py-2 mt-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => setRecette(prev => ({ ...prev, ingredients: [...prev.ingredients, ''] }))}
            >
              Ajouter un ingrédient
            </button>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700" htmlFor="etapes">
              Étapes
            </label>
            {recette.etapes.map((etape, index) => (
              <textarea
                key={index}
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                value={etape}
                onChange={e => handleEtapesChange(e, index)}
                required
                placeholder={`Étape ${index + 1}`}
              />
            ))}
            <button
              className="px-4 py-2 mt-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => setRecette(prev => ({ ...prev, etapes: [...prev.etapes, ''] }))}
            >
              Ajouter une étape
            </button>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700" htmlFor="categorie">
              Catégorie
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
              type="text"
              id="categorie"
              name="categorie"
              value={recette.categorie}
              onChange={handleChange}
              required
              placeholder="Ex: Plat principal, Entrée, Dessert"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Ajouter la recette
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};



export default AjouterRecette;

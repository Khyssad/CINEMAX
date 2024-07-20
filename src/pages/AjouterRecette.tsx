import React, { useState } from 'react';
import { Recette } from '../type';

const API_URL = 'https://api-recette-26n5.onrender.com/recettes';

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'nom':
        return /^[a-zA-ZÀ-ÿ\s]{3,50}$/.test(value) ? '' : 'Le nom doit contenir entre 3 et 50 caractères alphabétiques.';
      case 'description':
        return value.length >= 10 && value.length <= 500 ? '' : 'La description doit contenir entre 10 et 500 caractères.';
      case 'temps_preparation':
      case 'temps_cuisson':
        return /^\d{1,3}$/.test(value) ? '' : 'Le temps doit être un nombre entre 0 et 999 minutes.';
      case 'personnes':
        return /^[1-9]\d*$/.test(value) ? '' : 'Le nombre de personnes doit être un entier positif.';
      case 'categorie':
        return /^[a-zA-ZÀ-ÿ\s]{3,30}$/.test(value) ? '' : 'La catégorie doit contenir entre 3 et 30 caractères alphabétiques.';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRecette(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
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
    const formErrors: { [key: string]: string } = {};
    Object.entries(recette).forEach(([key, value]) => {
      if (typeof value === 'string') {
        const error = validateField(key, value);
        if (error) formErrors[key] = error;
      }
    });

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

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
      setErrors({});
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
              className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline ${errors.nom ? 'border-red-500' : ''}`}
              type="text"
              id="nom"
              name="nom"
              value={recette.nom}
              onChange={handleChange}
              required
              placeholder="Ex: Tarte aux pommes"
            />
            {errors.nom && <p className="text-xs italic text-red-500">{errors.nom}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700" htmlFor="description">
              Description
            </label>
            <textarea
              className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline ${errors.description ? 'border-red-500' : ''}`}
              id="description"
              name="description"
              value={recette.description}
              onChange={handleChange}
              required
              placeholder="Ex: Un plat végétarien provençal savoureux et coloré"
            />
            {errors.description && <p className="text-xs italic text-red-500">{errors.description}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700" htmlFor="temps_preparation">
              Temps de préparation (min)
            </label>
            <input
              className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline ${errors.temps_preparation ? 'border-red-500' : ''}`}
              type="number"
              id="temps_preparation"
              name="temps_preparation"
              value={recette.temps_preparation}
              onChange={handleChange}
              required
            />
            {errors.temps_preparation && <p className="text-xs italic text-red-500">{errors.temps_preparation}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700" htmlFor="temps_cuisson">
              Temps de cuisson (min)
            </label>
            <input
              className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline ${errors.temps_cuisson ? 'border-red-500' : ''}`}
              type="number"
              id="temps_cuisson"
              name="temps_cuisson"
              value={recette.temps_cuisson}
              onChange={handleChange}
              required
            />
            {errors.temps_cuisson && <p className="text-xs italic text-red-500">{errors.temps_cuisson}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700" htmlFor="difficulte">
              Difficulté
            </label>
            <select
              className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline ${errors.difficulte ? 'border-red-500' : ''}`}
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
            {errors.difficulte && <p className="text-xs italic text-red-500">{errors.difficulte}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700" htmlFor="personnes">
              Nombre de personnes
            </label>
            <input
              className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline ${errors.personnes ? 'border-red-500' : ''}`}
              type="number"
              id="personnes"
              name="personnes"
              value={recette.personnes}
              onChange={handleChange}
              required
            />
            {errors.personnes && <p className="text-xs italic text-red-500">{errors.personnes}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700" htmlFor="ingredients">
              Ingrédients
            </label>
            {recette.ingredients.map((ingredient, index) => (
              <textarea
                key={index}
                className="w-full px-3 py-2 mb-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
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
                className="w-full px-3 py-2 mb-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
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
              className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline ${errors.categorie ? 'border-red-500' : ''}`}
              type="text"
              id="categorie"
              name="categorie"
              value={recette.categorie}
              onChange={handleChange}
              required
              placeholder="Ex: Plat principal, Entrée, Dessert"
            />
            {errors.categorie && <p className="text-xs italic text-red-500">{errors.categorie}</p>}
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
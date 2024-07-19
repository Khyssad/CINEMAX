import React from 'react';
import { useParams } from 'react-router-dom';
import recettesData from '../data/recettes.json';
// import { Recette } from '../type';

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const recette = recettesData.recettes.find(r => r.id === parseInt(id as string));

  if (!recette) {
    return <div>Recette non trouvée</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="my-4 text-3xl font-bold">{recette.nom}</h1>
      <img
        src={`https://placehold.co/600x400/gray/white?text=${recette.nom}`}
        alt={recette.nom}
        className="w-full mb-4 rounded-lg"
      />
      <p className="mb-4">{recette.description}</p>
      <div className="mb-4">
        <p>Temps de préparation : {recette.temps_preparation} minutes</p>
        <p>Temps de cuisson : {recette.temps_cuisson} minutes</p>
        <p>Difficulté : {recette.difficulte}</p>
        <p>Pour {recette.personnes} personnes</p>
      </div>
      <h2 className="mb-2 text-2xl font-bold">Ingrédients :</h2>
      <ul className="pl-5 mb-4 list-disc">
        {recette.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2 className="mb-2 text-2xl font-bold">Étapes :</h2>
      <ol className="pl-5 list-decimal">
        {recette.etapes.map((etape, index) => (
          <li key={index} className="mb-2">{etape}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetails;
// Définissez une nouvelle interface pour les recettes
import { Recette } from '../type';
interface RecettesProps {
    recettes: Recette[];
    
    addToFavorite: (recette: Recette) => void;
    removeFromFavorite: (recetteId: number) => void;
}


export default function Carte({ recettes,  addToFavorite, removeFromFavorite }: RecettesProps) {
    return (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {recettes.map((recette) => (
                <div
                    key={recette.id}
                    className="p-3 transition-shadow duration-200 ease-in-out border rounded-lg shadow-md bg-slate-50 hover:shadow-lg">
                    <div className="text-center">
                        <img
                            src={`https://placehold.co/330x430/gray/white?text=${recette.nom}`}
                            className="rounded-lg"
                            alt={recette.nom}
                            width={330} />
                        <div className="flex flex-col justify-between p-2">
                            <h5 className="text-xl font-light leading-relaxed">{recette.nom}</h5>
                            <p className="text-center">{recette.categorie}</p>
                            <p className="text-sm">Préparation: {recette.temps_preparation} min</p>
                            <p className="text-sm">Cuisson: {recette.temps_cuisson} min</p>
                            <p className="text-sm">Difficulté: {recette.difficulte}</p>
                            <p className="text-sm">Pour {recette.personnes} personnes</p>
                        </div>
                        <div className="flex flex-col justify-between p-2">
                            <button onClick={() => addToFavorite(recette)}>
                                Ajouter aux favoris
                            </button>
                            <button onClick={() => removeFromFavorite(recette.id)}>
                                Retirer des favoris
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    )
}
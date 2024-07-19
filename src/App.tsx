import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Accueil';
import Favoris from './pages/Favoris';
import AjouterRecette from './pages/AjouterRecette';
import RecipeDetails from './pages/DétailRecette';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main className="container mx-auto mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoris" element={<Favoris />} />
          <Route path="/ajouter-recette" element={<AjouterRecette />} />
          <Route path="/recette/:id" element={<RecipeDetails />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
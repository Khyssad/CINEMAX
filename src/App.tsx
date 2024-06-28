// Here is your key: 89620012

// Please append it to all of your API requests,

// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=89620012

// Click the following URL to activate your key: http://www.omdbapi.com/apikey.aspx?VERIFYKEY=b8793061-7d09-4d38-a075-5440cdcc6511
// If you did not make this request, please disregard this email.


import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from './components/Card';

export default function App() {

  const [listMovies, setListMovies] = useState([
    {
      "Title": "Harry Potter and the Sorcerer's Stone",
      "Year": "2001",
      "imdbID": "tt0241527",
      "Type": "movie",
      "Poster": ""
    },
    {
      "Title": "The Sword in the Stone",
      "Year": "1963",
      "imdbID": "tt0057546",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BODVmNGMyMzUtYTgyMy00YjJlLTg1ZmMtMGI1YmU4NmU1Mjg4XkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "Romancing the Stone",
      "Year": "1984",
      "imdbID": "tt0088011",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMWIwNWNmMWMtYzc4MC00ZTRhLTk1MDUtYTk3OGY0YTQ1NTUxXkEyXkFqcGdeQXVyMTUzMDUzNTI3._V1_SX300.jpg"
    },
    {
      "Title": "The Family Stone",
      "Year": "2005",
      "imdbID": "tt0356680",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNGM1MmRlMzItZjNmMi00NDNlLTgxYjktMzE0OWJmYTk2YTgxXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg"
    },
    {
      "Title": "Heart of Stone",
      "Year": "2023",
      "imdbID": "tt13603966",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTJhYjI1N2ItM2E4MC00ZmYzLTk2YzYtNTE5YTM1MDU0NjRiXkEyXkFqcGdeQXVyMTMxNjYyMTgw._V1_SX300.jpg"
    },
    {
      "Title": "Stone",
      "Year": "2010",
      "imdbID": "tt1423995",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTgxOTk4MDIyOF5BMl5BanBnXkFtZTcwMzI3Nzc3Mw@@._V1_SX300.jpg"
    },
    {
      "Title": "Dr. Stone",
      "Year": "2019–",
      "imdbID": "tt9679542",
      "Type": "series",
      "Poster": "https://m.media-amazon.com/images/M/MV5BYmU2MzEyMjAtOTQ5Yy00NGMxLTg0NmItMTQ0ZTM5OGY0NjUzXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg"
    },
    {
      "Title": "Hands of Stone",
      "Year": "2016",
      "imdbID": "tt1781827",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjQxNzE4ODU1Nl5BMl5BanBnXkFtZTgwMDA4Njk0ODE@._V1_SX300.jpg"
    },
    {
      "Title": "The Deaths of Ian Stone",
      "Year": "2007",
      "imdbID": "tt0810823",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNDg2NTgxODQ0NF5BMl5BanBnXkFtZTcwMzg1MTU1MQ@@._V1_SX300.jpg"
    },
    {
      "Title": "Voice from the Stone",
      "Year": "2017",
      "imdbID": "tt1544608",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNzQzNzc2MDQ3OF5BMl5BanBnXkFtZTgwNTU2NzU2MTI@._V1_SX300.jpg"
    }
  ]);

  const [query, setQuery] = useState("")
  const [error, setError] = useState("")

  const searchMovie = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault() // On limite le formulaire à la soumission
    if (query.trim().length > 2) {
      setError("Merci de tapez un mot-clé de 3 caractères minimum")
    } // Si le champ est vide ou trop court on affiche une erreur

    const url = `http://www.omdbapi.com/?apikey=89620012&s=${query}`
    try {
      const res = await fetch(url) // On fetch l'API OMDB
      const data = await res.json() // On récupère les données et les converti
      if (data.Response === "False") { // S'il n'y a pas de résultat
        setListMovies([]) // Le tableau est vide
      } else { // S'il y a un résultat
        setListMovies(data.Search) // On l'ajoute au tableau
      }
    } catch (err) {
      setError("Une erreur est survenue lors votre recherche")
    }
  }

  return (
    <main>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Cinemax</h1>
      </motion.div>
      <motion.div

      >
        <h3 className="text-center">Trouvez les infos de films et de séries en 2 clics !</h3>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={searchMovie}>
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </button>
        </form>
        <p className="text-red-500 text-center">{error ? error : ""}</p>
      </motion.div>

      <Card movies={listMovies} />
    </main>

  )
}


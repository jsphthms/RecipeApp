import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Recipe from './Recipe';
import RecipeList from './RecipeList';


function App() {

  const APP_ID = 'ffaf6eb8';
  const APP_KEY = 'f1ab4f8c8abfeda0b657313fe22d736a';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);

  }

  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search)
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <Router>
      <div className="App">
        <form className='search-form' onSubmit={getSearch} >
          <input className='search-bar' type="text" value={search} onChange={updateSearch} />
          <button className='search-button' type="submit">Search</button>
        </form>
        <h1>Search for recipes</h1>
        <Switch>
          <Route path='/' exact render={(props) => <RecipeList {...props} recipes={recipes} query={query} />} />
          <Route path='/recipe/:id' render={(props) => <Recipe {...props} recipes={recipes} query={query} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

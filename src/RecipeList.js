import React from 'react'
import { Link } from 'react-router-dom';


export default function RecipeList({ recipes }) {

    return (
        <div className='recipe-list' >
            {recipes.map(recipe => (
                <Link key={recipe.recipe.label} to={`/recipe/${recipe.recipe.label}`}><h1>{recipe.recipe.label}</h1></Link>
            ))}
        </div>
    )
}

import React, { useState, useEffect } from 'react'
import style from './recipe.module.css';
const Recipe = ({ match, query }) => {
    const APP_ID = 'ffaf6eb8';
    const APP_KEY = 'f1ab4f8c8abfeda0b657313fe22d736a';

    useEffect(() => {
        fetchItem(match);
        console.log('Match printed');
    }, []);

    const [recipe, setRecipe] = useState([]);

    const fetchItem = async () => {
        const data = await fetch(
            `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&label=${match.params.id}`
        );
        const item = await data.json();
        console.log(item);
        for (let i = 0; i < item.hits.length; i++) {
            console.log('loop started');
            if (match.params.id === item.hits[i].recipe.label)
                setRecipe([{
                    label: item.hits[i].recipe.label,
                    calories: item.hits[i].recipe.calories,
                    image: item.hits[i].recipe.image,
                    ingredients: item.hits[i].recipe.ingredientLines
                }]);
        }
    };

    return (
        <div className='recipe-box'>
            {recipe.map(recipe => (
                <div className={style.recipe} key={recipe.label}>
                    <div className='recipes'>
                        <h1>{recipe.label}</h1>
                        <img className={style.image} src={recipe.image} alt="" />

                        <p><strong>Calories: </strong> {recipe.calories}</p>
                        <ul>
                            {recipe.ingredients.map(ingredients => (
                                <li key={ingredients}>{ingredients}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))
            }
        </div>
    )
}


export default Recipe

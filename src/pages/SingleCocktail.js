import React,{useState, useEffect} from "react";
import {useParams, Link} from 'react-router-dom'
export default function SingleCocktail() {
  const {id}=useParams();
const [loading, setLoading] = useState(false);
const [cocktail, setCocktail] =useState(null);

useEffect(()=>{
  setLoading(true);
  async function getCocktail(){
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      const data = await response.json();
      if(data.drinks){
        console.log(data.drinks)
        const {
          strDrink:name,
          strDrinkThumb:image,
          strAlcoholic:info,
          strCategory:category,
          strGlass:glass,
          strInstructions:instructions,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5
        } = data.drinks[0];
        const ingredients= [strIngredient1,strIngredient2,strIngredient3,
          strIngredient4, strIngredient5]
          const newCocktail={name,image, 
            info,category,glass,
          instructions,ingredients}
          setCocktail(newCocktail)
      }else 
      {
        setCocktail(null)
      }

    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  getCocktail();
}, [id])
if(loading){
  return <h2 className="section-title">Loading......</h2>
}
if(!cocktail){
  return <h2 className="section-title">No CocktailDB</h2>
}
else{
  const {name,image, 
    info,category,glass,
  instructions,ingredients}=cocktail;
  return <section className="section cocktail-section">
    <Link to="/" className="btn btn-primary">Back Home</Link>
  <h2 className="section-title">{name}</h2>
  <div className="drink">
    <img src={image} alt={name}/>
  <div className="drink-info">
  <p>Name:{' '} {name}</p>
  <p>Category:{' '} {category}</p>
  <p>Info:{' '}{info}</p>
  <p>Glass:{' '}{glass}</p>
  <p>Instructions:{' '}{instructions}</p>
  <p>
    ingredients: {'  '}
    {ingredients.map((item, index)=>{
      return item ? <span key={index}>{item}</span>: null
    })}
  </p>

  </div>
  </div>
  </section>

}
}

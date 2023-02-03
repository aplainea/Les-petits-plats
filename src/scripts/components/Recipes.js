import { RecipeCard } from '../templates/RecipeCard.js';

// Show Recipes
export function showCardsRecipes(recipes) {
    const recipesWrapper = document.getElementById('recipes');

    if (recipes.length === 0) {
        // Error message
        const message = document.createElement('p');
        message.textContent = `Aucun résultat trouvé.`;
        recipesWrapper.appendChild(message);
    } else {
        // Create templates
        recipes.forEach((recipe) => {
            const recipeTempalte = new RecipeCard(recipe);
            recipesWrapper.appendChild(recipeTempalte.createRecipeCard());
        });
    }
}

import { RecipeCard } from '../templates/RecipeCard.js';

// Show Recipes
export function showCardsRecipes(recipes) {
    const recipesWrapper = document.getElementById('recipes');

    if (recipes.length === 0) {
        // Error message
        const message = document.createElement('p');
        message.textContent = `Aucune recette ne correspond à votre critère... Vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
        recipesWrapper.appendChild(message);
    } else {
        // Create templates
        recipes.forEach((recipe) => {
            const recipeTempalte = new RecipeCard(recipe);
            recipesWrapper.appendChild(recipeTempalte.createRecipeCard());
        });
    }
}

// Update Recipes cards
export function updateCardsRecipes(recipes) {
    deleteCardsRecipes();
    showCardsRecipes(recipes);
}

// Remove Recipes cards
export function deleteCardsRecipes() {
    const recipesWrapper = document.getElementById('recipes');
    recipesWrapper.innerHTML = '';
}

// Get all Appliances
export function getAllIngredients(recipes) {
    //flatMap() method to extract all the ingredients of each recipe and group them in a single list
    //map() method to keep only the ingredient names
    //filter() method to remove duplicates from the list
    return recipes
        .flatMap((recipe) => recipe._ingredients)
        .map((ingredient) => ingredient.ingredient)
        .filter((ingredient, index, array) => array.indexOf(ingredient) === index);
}

// Get all Appliances
export function getAllAppliances(recipes) {
    return recipes
        .map((recipe) => recipe._appliance)
        .filter((appliance, index, array) => array.indexOf(appliance) === index);
}

// Get all Ustensils
export function getAllUstensils(recipes) {
    return recipes
        .flatMap((recipe) => recipe._ustensils)
        .filter((ustensil, index, array) => array.indexOf(ustensil) === index);
}

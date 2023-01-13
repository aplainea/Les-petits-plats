import { RecipeApi } from './api/RecipeApi.js';
import { RecipesFactory } from './factories/RecipesFactory.js';

class App {
    constructor() {
        this._recipeApi = new RecipeApi('./src/data/recipes.json');
    }

    // Home Page
    async homePage() {
        // Get all recipes data
        const allRecipesData = await this._recipeApi.getAllRecipes();

        // Check if we have all recipes data
        if (allRecipesData) {
            // Use Factory
            const Recipes = allRecipesData.map((recipe) => new RecipesFactory(recipe, 'RecipeApi'));

            // All recipes data
            // console.log('===[ All recipes data ]===');
            // console.log(Recipes);
        }
    }
}
// Create App "Les-petits-plats"
const app = new App();

// Router
const currentPage = document.location.pathname;
router(app, currentPage);

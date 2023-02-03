import { RecipeApi } from './api/RecipeApi.js';
import { RecipesFactory } from './factories/RecipesFactory.js';
import { showCardsRecipes } from './components/Recipes.js';

class App {
    constructor() {
        this.recipeApi = new RecipeApi('./src/data/recipes.json');
        this.recipes = [];
    }

    // Home Page
    async homePage() {
        // Get all recipes data
        this.recipes = await this.recipeApi.getAllRecipes();

        // Check if we have all recipes data
        if (this.recipes !== []) {
            // Use Factory
            const Recipes = this.recipes.map((recipe) => new RecipesFactory(recipe, 'RecipeApi'));

            // All recipes data
            console.log('===[ All recipes data ]===');
            console.log(Recipes);

            showCardsRecipes(Recipes);
        }
    }
}
// Create App "Les-petits-plats"
const app = new App();

// Router
const currentPage = document.location.pathname;
router(app, currentPage);

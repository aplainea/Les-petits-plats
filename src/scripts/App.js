import { RecipeApi } from './api/RecipeApi.js';
import { RecipesFactory } from './factories/RecipesFactory.js';
import {
    showCardsRecipes,
    updateCardsRecipes,
    getAllIngredients,
    getAllAppliances,
    getAllUstensils,
} from './components/Recipes.js';
import { filterSearch } from './components/SearchFilter.js';
import { handleDropdown } from './components/Dropdown.js';
class App {
    constructor() {
        this.recipeApi = new RecipeApi('./src/data/recipes.json');
        this.recipes = [];
        this.ingredientsDropdown = document.querySelector('#ingredientsDropdown');
        this.appliancesDropdown = document.querySelector('#appliancesDropdown');
        this.ustensilsDropdown = document.querySelector('#ustensilsDropdown');
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
            // console.log('===[ All recipes data ]===');
            // console.log(Recipes);

            // Show all recipes cards (first time)
            showCardsRecipes(Recipes);

            // add listener on search bar
            // if search contain 3 characters => filtered recipes
            // else show all recipes
            this.searchBarEvent(Recipes);

            // All ingredients, appliances and ustensils data
            console.log(getAllIngredients(Recipes));
            console.log(getAllAppliances(Recipes));
            console.log(getAllUstensils(Recipes));

            // Create dropdown filter (ingredients, appliances and ustensils)
            handleDropdown('ingredients', getAllIngredients, Recipes);
            handleDropdown('appliances', getAllAppliances, Recipes);
            handleDropdown('ustensils', getAllUstensils, Recipes);
        }
    }

    searchBarEvent(recipesList) {
        const searchbar = document.querySelector('.search__input');
        searchbar.addEventListener('input', async (event) => {
            let searchWord = event.target.value;

            // search contains a minimum of 3 characters
            if (searchWord.length >= 3) {
                this.recipes = await filterSearch(searchWord, recipesList);

                // show recipes filtered
                updateCardsRecipes(this.recipes);
            } else {
                // update to show all recipes
                updateCardsRecipes(recipesList);
            }
        });
    }
}
// Create App "Les-petits-plats"
const app = new App();

// Router
const currentPage = document.location.pathname;
router(app, currentPage);

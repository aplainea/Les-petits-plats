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
import { DropdownFilter } from './templates/DropdownFilter.js';
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
            // console.log(getAllIngredients(Recipes));
            // console.log(getAllAppliances(Recipes));
            // console.log(getAllUstensils(Recipes));

            // Create dropdown filter (ingredients, appliances and ustensils)
            const ingredientDropdownFilter = new DropdownFilter(
                this.ingredientDropdown,
                getAllIngredients(Recipes),
                'Rechercher un ingrédient',
            );
            const applianceDropdownFilter = new DropdownFilter(
                this.appliancesDropdown,
                getAllIngredients(Recipes),
                'Rechercher un appareil',
            );
            const ustensilDropdownFilter = new DropdownFilter(
                this.ustensilsDropdown,
                getAllIngredients(Recipes),
                'Rechercher un ustensile',
            );

            // Add event listener on every input dropdown
            const ingredientDropdownInput = ingredientDropdown.querySelector('input');
            ingredientDropdownInput.addEventListener('input', (event) => {
                ingredientDropdownFilter.handleInput(event.target.value);
            });
            const applianceDropdownInput = ingredientDropdown.querySelector('input');
            applianceDropdownInput.addEventListener('input', (event) => {
                applianceDropdownFilter.handleInput(event.target.value);
            });
            const ustensiltDropdownInput = ingredientDropdown.querySelector('input');
            ustensiltDropdownInput.addEventListener('input', (event) => {
                ustensilDropdownFilter.handleInput(event.target.value);
            });
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

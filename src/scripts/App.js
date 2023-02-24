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
import { handleTagRemove } from './components/Tags.js';
class App {
    constructor() {
        this.recipeApi = new RecipeApi('./src/data/recipes.json');
        this.recipes = [];
        this.filteredRecipes = [];
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

            // Init all recipes cards (first time)
            showCardsRecipes(Recipes);

            // Init dropdown filter (ingredients, appliances and ustensils)
            handleDropdown('ingredients', getAllIngredients(Recipes));
            handleDropdown('appliances', getAllAppliances(Recipes));
            handleDropdown('ustensils', getAllUstensils(Recipes));

            // add listener on search bar
            this.searchBarEvent(Recipes);
        }
    }

    // Event on main search bar
    searchBarEvent(recipesList) {
        const searchbar = document.querySelector('.search__input');

        searchbar.addEventListener('input', async (event) => {
            const searchWord = event.target.value;
            const filteredRecipes =
                searchWord.length >= 3 ? await filterSearch(searchWord, recipesList) : recipesList;

            updateCardsRecipes(filteredRecipes);
            handleDropdown('ingredients', getAllIngredients(filteredRecipes));
            handleDropdown('appliances', getAllAppliances(filteredRecipes));
            handleDropdown('ustensils', getAllUstensils(filteredRecipes));
        });
    }

    getAllTagIds() {
        return Array.from(document.querySelectorAll('.tags button')).flatMap((button) => {
            const transformedId = button.id
                .replace('btn-', '')
                .replace(/-/g, ' ')
                .replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.substring(1));
            return [transformedId];
        });
    }
}

// Event close tag
document.addEventListener('click', (event) => {
    const clickedElement = event.target;
    if (clickedElement.classList.contains('fa-times')) {
        handleTagRemove(clickedElement);
    }
});

// Create App "Les-petits-plats"
const app = new App();

// Router
const currentPage = document.location.pathname;
router(app, currentPage);

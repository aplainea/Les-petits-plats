import { RecipeApi } from './api/RecipeApi.js';
import { RecipesFactory } from './factories/RecipesFactory.js';
import {
    showCardsRecipes,
    updateCardsRecipes,
    getAllIngredients,
    getAllAppliances,
    getAllUstensils,
    filterRecipesByTags,
} from './components/Recipes.js';
import { filterSearch } from './components/SearchFilter.js';
import { handleDropdown } from './components/Dropdown.js';
import { handleTagRemove, getAllTagIds } from './components/Tags.js';
class App {
    constructor() {
        this.recipeApi = new RecipeApi('./src/data/recipes.json');
        this.ingredientsDropdown = document.querySelector('#ingredientsDropdown');
        this.appliancesDropdown = document.querySelector('#appliancesDropdown');
        this.ustensilsDropdown = document.querySelector('#ustensilsDropdown');
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
            this.recipes = Recipes;

            // Init all recipes cards (first time)
            showCardsRecipes(this.recipes);

            // Init dropdown filter (ingredients, appliances and ustensils)
            this.updateDropdown();

            // add listener on search bar
            this.searchBarEvent(this.recipes);
            // add listener on tags container
            this.tagsEvent(this.recipes);
        }
    }

    // Event on main search bar
    searchBarEvent(recipes) {
        const searchbar = document.querySelector('.search__input');

        searchbar.addEventListener('input', async (event) => {
            const searchWord = event.target.value;
            const filteredRecipes =
                searchWord.length >= 3
                    ? await filterSearch(searchWord, this.recipes)
                    : (this.recipes = recipes);

            this.recipes = filteredRecipes;

            // update recipes with tags filters
            this.tagsEvent(this.recipes);

            // update recipes list
            updateCardsRecipes(this.recipes);

            // update dropdown filter
            this.updateDropdown();
        });
    }

    // Event on tags
    tagsEvent(recipes) {
        const tagsContainer = document.querySelector('.tags-container');
        // When new or remove tag on tags container
        tagsContainer.addEventListener('DOMSubtreeModified', () => {
            // Update recipes with tags
            this.updateTagsRecipes(recipes);
        });
        // Update recipes with tags
        this.updateTagsRecipes(recipes);
    }

    // Update recipes by tags
    updateTagsRecipes(recipes) {
        let filteredRecipesWithTags = filterRecipesByTags(recipes, getAllTagIds());
        filteredRecipesWithTags.length > 0
            ? (this.recipes = filteredRecipesWithTags)
            : (this.recipes = recipes);
        // update recipes list
        updateCardsRecipes(this.recipes);
        // update dropdown filter
        this.updateDropdown();
    }

    // Update dropdowns with updated recipes
    updateDropdown() {
        handleDropdown('ingredients', getAllIngredients(this.recipes));
        handleDropdown('appliances', getAllAppliances(this.recipes));
        handleDropdown('ustensils', getAllUstensils(this.recipes));
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

class RecipeCard {
    constructor(recipe) {
        this.recipe = recipe;
    }

    // Create Recipe Card
    createRecipeCard() {
        // generate dynamics recipe card
        const recipeCard = document.createElement('div');
        const content = `
        test
        `;
        recipeCard.innerHTML = content;
        return recipeCard;
    }
}

export { RecipeCard };

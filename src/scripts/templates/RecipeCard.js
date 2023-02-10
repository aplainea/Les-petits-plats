class RecipeCard {
    constructor(recipe) {
        this.recipe = recipe;
    }

    // Create Recipe Card
    createRecipeCard() {
        // Manage ingredients
        let ingredients = '';
        // for all ingredients by recipe
        for (const ingredient of this.recipe._ingredients) {
            // if ingredients contain a quantity
            if (ingredient.hasOwnProperty('quantity')) {
                ingredients += `<span class="fw-bold">${ingredient.ingredient}:</span> ${ingredient.quantity}`;
                // if also contain a unit
                if (ingredient.hasOwnProperty('unit')) {
                    ingredients += ` ${ingredient.unit}<br>`;
                } else {
                    // next ingredient
                    ingredients += `<br>`;
                }
            } else {
                // its just a ingredient without quantity and unit
                ingredients += `<span class="fw-bold">${ingredient.ingredient}</span><br>`;
            }
        }

        // generate dynamics recipe card
        const recipeCard = document.createElement('div');
        const content = `
            <div class="card mb-4">
                <div class="card__img"></div>
                <div class="card__description">
                    <div class="card__description--header">
                        <h2 class="card__description--title">${this.recipe._name}</h2>
                        <p class="card__description--time">
                            <i class="fa-regular fa-clock"></i> ${this.recipe._time} min
                        </p>
                    </div>
                    <div class="card__description--content">
                        <p class="card__description--ingredients me-1">${ingredients}</p>
                        <p class="card__description--preparation">${this.recipe._description}</p>
                    </div>
                </div>
            </div>
        `;
        recipeCard.innerHTML = content;
        return recipeCard;
    }
}

export { RecipeCard };

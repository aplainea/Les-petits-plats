// Search (for ())
export function forSearch(search, recipes) {
    const searchLower = search.toLowerCase();
    const filteredRecipes = [];

    // for all recipes
    for (const recipe of recipes) {
        let recipeLower = recipe._name.toLowerCase();

        // add it to the table of filtered recipes if the recipe name contains the search
        if (recipeLower.includes(searchLower)) {
            filteredRecipes.push(recipe);
        } else {
            // same with the description
            recipeLower = recipe._description.toLowerCase();

            if (recipeLower.includes(searchLower)) {
                filteredRecipes.push(recipe);
            } else {
                // same with the ingredients
                for (const ing of recipe._ingredients) {
                    if (ing.ingredient.toLowerCase().includes(searchLower)) {
                        filteredRecipes.push(recipe);
                    }
                }
            }
        }
    }

    // return the filtered recipes
    return filteredRecipes;
}

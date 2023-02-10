// Search (filter ())
export function filterSearch(search, recipes) {
    const searchLower = search.toLowerCase();

    // filter all recipes based on the search
    const filteredRecipes = recipes.filter((recipe) => {
        // convert recipe name and description to lowercase for comparison
        const recipeNameLower = recipe._name.toLowerCase();
        const recipeDescriptionLower = recipe._description.toLowerCase();

        // return true if the search is found in the recipe name, description or ingredients
        return (
            recipeNameLower.includes(searchLower) ||
            recipeDescriptionLower.includes(searchLower) ||
            recipe._ingredients.some((ingredient) =>
                ingredient.ingredient.toLowerCase().includes(searchLower),
            )
        );
    });

    // return the filtered recipes
    return filteredRecipes;
}

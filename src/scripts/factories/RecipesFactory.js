import { Recipe } from '../models/Recipe.js';

class RecipesFactory {
    constructor(data, type) {
        // Recipe
        if (type === 'RecipeApi') {
            return new Recipe(data);
        } else {
            throw 'Unknown type';
        }
    }
}

export { RecipesFactory };

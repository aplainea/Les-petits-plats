import { Api } from './Api.js';
class RecipeApi extends Api {
    constructor(url) {
        super(url);
    }

    // Get all recipes
    async getAllRecipes() {
        try {
            const data = await this.get();
            return data.recipes;
        } catch (error) {
            console.log(error);
        }
    }
}

export { RecipeApi };

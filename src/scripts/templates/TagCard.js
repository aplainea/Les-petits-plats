// Create Tag Card
export function createTagCard(nameRecipe, filterRecipe) {
    const tagCard = document.createElement('div');
    const content = `
        <button class="tag__ingredient btn ${filterRecipe}">
            <span class="pe-2">${nameRecipe}</span>
            <i class="fa fa-times"></i>
        </button>
        `;
    tagCard.innerHTML = content;
    return tagCard;
}

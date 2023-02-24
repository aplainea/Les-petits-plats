export function handleTagRemove(tag) {
    const tagCard = tag.closest('.tag__ingredient');
    tagCard.parentNode.removeChild(tagCard);
}

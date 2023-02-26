// Remove a tag
export function handleTagRemove(tag) {
    const tagCard = tag.closest('.tag__ingredient');
    tagCard.parentNode.removeChild(tagCard);
}

// Get all tag name
export function getAllTagIds() {
    return Array.from(document.querySelectorAll('.tags button')).flatMap((button) => {
        const transformedId = button.id
            .replace('btn-', '')
            .replace(/-/g, ' ')
            .replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.substring(1));
        return [transformedId];
    });
}

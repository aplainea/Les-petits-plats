import { createTagCard } from '../templates/TagCard.js';
// Show menu on dropdown
function displayMenuForDropdown(dropdownId, items) {
    const dropdown = document.querySelector(`#${dropdownId}-dropdown`);
    const input = dropdown.querySelector(`#${dropdownId}-input`);
    const menu = dropdown.querySelector(`#${dropdownId}-menu`);

    menu.innerHTML = '';

    // manage items on 3 columns
    const columns = 3;
    const itemsPerColumn = Math.ceil(items.length / columns);

    const columnElements = Array.from({ length: columns }, () => document.createElement('div'));

    items.filter((ingredient, index, array) => array.indexOf(ingredient) === index);

    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.setAttribute('id', `${dropdownId}-tag`);
        li.textContent = item;
        li.style.width = '100%';

        const columnIndex = Math.floor(index / itemsPerColumn);
        columnElements[columnIndex].appendChild(li);
    });

    columnElements.forEach((column) => {
        column.classList.add('menu-column');
        menu.appendChild(column);
    });

    if (items !== null) {
        menu.style.display = 'block';
    }
}
// Dropdown
export function handleDropdown(dropdownId, recipes) {
    const dropdown = document.querySelector(`#${dropdownId}-dropdown`);
    const input = dropdown.querySelector(`#${dropdownId}-input`);
    const inputIcon = dropdown.querySelector(`#${dropdownId}-icon`);
    const menu = dropdown.querySelector(`#${dropdownId}-menu`);

    // Used to show dropdown with updated list
    input.addEventListener('input', (event) => {
        const inputValue = event.target.value.trim();
        if (inputValue) {
            const items = recipes.filter((item) =>
                item.toLowerCase().includes(inputValue.toLowerCase()),
            );
            displayMenuForDropdown(dropdownId, items);
        } else {
            displayMenuForDropdown(dropdownId, recipes);
        }
    });

    // Manage style input with menu
    input.addEventListener('focus', (event) => {
        displayMenuForDropdown(dropdownId, recipes);
        input.style.width = '750px';
        input.style.zIndex = '3';
        inputIcon.classList.add('icon-rotate');
    });
    input.addEventListener('blur', (event) => {
        event.stopPropagation();
        input.value = '';
        input.style.width = '130px';
        input.style.zIndex = '1';
        inputIcon.classList.remove('icon-rotate');
    });

    // manage tags (create tag when clicking on LI)
    menu.addEventListener('click', (event) => {
        if (event.target.nodeName === 'LI') {
            const tagId = event.target.id;
            const tagName = event.target.textContent;
            const wrapperMap = {
                'ingredients-tag': 'tags__ingredients',
                'appliances-tag': 'tags__appliances',
                'ustensils-tag': 'tags__ustensils',
            };
            const wrapperId = wrapperMap[tagId];
            if (wrapperId) {
                const wrapper = document.getElementById(wrapperId);
                const existingTag = wrapper.querySelector(
                    `#btn-${tagName.replace(/ /g, '-').toLowerCase()}`,
                );
                if (!existingTag) {
                    wrapper.appendChild(createTagCard(tagName, tagId));
                }
                menu.style.display = 'none';
            }
        }
    });

    // Close dropdown when clicking outside of it
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = menu.contains(event.target);
        const isClickInsideInput = input.contains(event.target);
        if (!isClickInsideMenu && !isClickInsideInput) {
            menu.style.display = 'none';
        }
    });
}

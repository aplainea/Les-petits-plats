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

    input.addEventListener('focus', (event) => {
        displayMenuForDropdown(dropdownId, recipes);
        input.style.width = '750px';
        input.style.zIndex = '3';
        inputIcon.classList.add('icon-rotate');
    });

    input.addEventListener('blur', (event) => {
        input.value = '';
        input.style.width = '130px';
        input.style.zIndex = '1';
        menu.style.display = 'none';
        inputIcon.classList.remove('icon-rotate');
    });

    menu.addEventListener('click', (event) => {
        if (event.target.nodeName === 'LI') {
            menu.style.display = 'none';
        }
    });
}

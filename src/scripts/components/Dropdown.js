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

    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;

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
    console.log(items);
}
// Dropdown
export function handleDropdown(dropdownId, recipes) {
    const dropdown = document.querySelector(`#${dropdownId}-dropdown`);
    const input = dropdown.querySelector(`#${dropdownId}-input`);
    const menu = dropdown.querySelector(`#${dropdownId}-menu`);

    input.addEventListener('input', (event) => {
        const inputValue = event.target.value.trim();
        if (inputValue) {
            const items = recipes.filter((item) =>
                item.toLowerCase().includes(inputValue.toLowerCase()),
            );
            displayMenuForDropdown(dropdownId, items);
        } else {
            const items = recipes;
            displayMenuForDropdown(dropdownId, items);
        }
    });

    input.addEventListener('focus', (event) => {
        const items = recipes;
        displayMenuForDropdown(dropdownId, items);
    });

    input.addEventListener('blur', (event) => {
        menu.style.display = 'none';
    });

    menu.addEventListener('click', (event) => {
        if (event.target.nodeName === 'LI') {
            const selected = event.target.textContent;
            input.value = selected;
            menu.style.display = 'none';
        }
    });
}

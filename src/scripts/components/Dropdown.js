// Fonction pour afficher le menu pour un dropdown
function displayMenuForDropdown(dropdownId, items) {
    const dropdown = document.querySelector(`#${dropdownId}-dropdown`);
    const input = dropdown.querySelector(`#${dropdownId}-input`);
    const menu = dropdown.querySelector(`#${dropdownId}-menu`);
    menu.innerHTML = '';
    const columns = 3;
    const maxItems = 30;
    const itemsPerColumn = Math.ceil(Math.min(maxItems, items.length) / columns);
    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.classList.add('menu-column');
        for (let j = 0; j < itemsPerColumn; j++) {
            const index = i * itemsPerColumn + j;
            if (index >= items.length) {
                break;
            }
            const item = items[index];
            const li = document.createElement('li');
            li.textContent = item;
            column.appendChild(li);
        }
        menu.appendChild(column);
    }
    menu.style.display = 'block';
}

export function handleDropdown(dropdownId, getAllItems, recipes) {
    const dropdown = document.querySelector(`#${dropdownId}-dropdown`);
    const input = dropdown.querySelector(`#${dropdownId}-input`);
    const menu = dropdown.querySelector(`#${dropdownId}-menu`);

    input.addEventListener('input', (event) => {
        const inputValue = event.target.value.trim();
        if (inputValue) {
            const items = getAllItems(recipes).filter((item) =>
                item.toLowerCase().includes(inputValue.toLowerCase()),
            );
            displayMenuForDropdown(dropdownId, items);
        } else {
            const items = getAllItems(recipes);
            displayMenuForDropdown(dropdownId, items);
        }
    });

    input.addEventListener('focus', (event) => {
        const items = getAllItems(recipes);
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

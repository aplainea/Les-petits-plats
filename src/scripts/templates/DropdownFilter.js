class DropdownFilter {
    constructor(containerElement, items, placeholderText) {
        this.containerElement = containerElement;
        this.items = items;
        this.placeholderText = placeholderText;
        this.filteredItems = items;

        this.createDropdown();
    }

    createDropdown() {
        // Create dropdown input element
        const inputElement = document.createElement('input');
        inputElement.classList.add('form-control');
        inputElement.type = 'text';
        inputElement.placeholder = this.placeholderText;
        inputElement.addEventListener('input', (event) => this.handleInput(event.target.value));

        // Create dropdown list element
        const listElement = document.createElement('div');
        listElement.classList.add('dropdown-menu');

        // Append input and list elements to container
        this.containerElement.appendChild(inputElement);
        this.containerElement.appendChild(listElement);

        // Update list items
        this.updateList();
    }

    handleInput(value) {
        this.filteredItems = this.items.filter((item) =>
            item.toLowerCase().includes(value.toLowerCase()),
        );
        this.updateList();
    }

    updateList() {
        const listElement = this.containerElement.querySelector('.dropdown-menu');

        // Clear existing list items
        listElement.innerHTML = '';

        // Create list item elements
        const itemElements = this.filteredItems.map((item) => {
            const itemElement = document.createElement('a');
            itemElement.classList.add('dropdown-item');
            itemElement.href = '#';
            itemElement.innerText = item;
            return itemElement;
        });

        // Create list item groups with a maximum of 10 items per group
        for (let i = 0; i < itemElements.length; i += 10) {
            const groupElement = document.createElement('div');
            groupElement.classList.add('dropdown-group');
            groupElement.append(...itemElements.slice(i, i + 10));
            listElement.appendChild(groupElement);
        }
    }
}

export { DropdownFilter };

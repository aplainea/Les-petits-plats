export function displayDropdownMenu(items, wrapper, Template) {
    const numCols = 3;
    const numRows = Math.ceil(Math.min(items.length, 30) / numCols);

    for (let row = 0; row < numRows; row++) {
        const rowElem = document.createElement('div');
        rowElem.classList.add('row');

        for (let col = 0; col < numCols; col++) {
            const index = row * numCols + col;
            if (index >= items.length) {
                break;
            }

            const item = items[index];
            const template = new Template(item);

            const colElem = document.createElement('div');
            colElem.classList.add('col-12', 'col-md-4');
            colElem.appendChild(template.createDropdownMenuItem());

            rowElem.appendChild(colElem);
        }

        wrapper.appendChild(rowElem);
    }
}

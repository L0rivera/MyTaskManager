
document.addEventListener('DOMContentLoaded', () => {
    const createSButton = document.getElementById('add-i');
    const modal = document.getElementById('modal-container-s');
    const cancelButton = document.querySelector('.btn.Cancel');

    createSButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    cancelButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});

const addSection = document.getElementById('add-i');
const dropdownmenu = document.getElementById('dropdown-menu-s');




// app.js
document.addEventListener('DOMContentLoaded', () => {
    const toggleMenuButton = document.getElementById('toggle-menu');
    const menu = document.querySelector('.menu');
    const dropdownMenu = document.querySelector('.dropdown-menu-t');
    const date = document.getElementById('date-i');

    toggleMenuButton.addEventListener('click', () => {
        menu.classList.toggle('active');
    });

    // Ocultar el menú al hacer clic fuera de él
    document.addEventListener('click', (event) => {
        if (!menu.contains(event.target) && !toggleMenuButton.contains(event.target)) {
            menu.classList.remove('active');
        }
    });

    // Prevenir la propagación del evento de clic en el menú
    dropdownMenu.addEventListener('click', (event) => {
        event.stopPropagation();
    });
});









document.addEventListener('DOMContentLoaded', () => {
    const createPButton = document.getElementById('createP');
    const modal = document.getElementById('modal-container');
    const closeButton = document.querySelector('.close-button');
    const cancelButton = document.querySelector('.btn.Cancel');

    createPButton.addEventListener('click', () => {
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

//DROPDOWN MENU

document.addEventListener('DOMContentLoaded', () => {
    const profile = document.getElementById('profile-i');
    const config = document.getElementById('config-i');
    const logout = document.getElementById('logout-i');

    profile.addEventListener('click', () => {
        window.location.href = '/Views/AppViews/Profile.html'
    })

    logout.addEventListener('click', () => {
        document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.location.href = '/Views/Access/signin.html'
    })
})



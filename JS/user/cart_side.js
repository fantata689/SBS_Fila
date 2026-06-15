document.addEventListener('DOMContentLoaded', () => {
    const bagIcons = document.querySelectorAll('.fa-bag-shopping');
    const sidebar = document.querySelector('.cart-sidebar');
    const overlay = document.querySelector('.cart-sidebar-overlay');
    const closeBtn = document.querySelector('.cart-sidebar .close');

    const openSidebar = (e) => {
        if (e) e.preventDefault();
        sidebar.classList.add('is-visible');
        overlay.classList.add('is-visible');
        document.body.style.overflow = 'hidden';
    };

    const closeSidebar = () => {
        sidebar.classList.remove('is-visible');
        overlay.classList.remove('is-visible');
        document.body.style.overflow = '';
    };

    bagIcons.forEach(icon => {
        const link = icon.closest('a');
        if (link) {
            link.addEventListener('click', openSidebar);
        } else {
            icon.addEventListener('click', openSidebar);
        }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);
});

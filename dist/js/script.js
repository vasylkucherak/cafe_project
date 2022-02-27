window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    const menuPanel = document.querySelector('.menu__panel'),
          menuItems = menuPanel.querySelectorAll('.menu__item');
    
    menuPanel.addEventListener('click', (e) => {
        if (e.target.classList.contains('menu__item')) {
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            e.target.classList.add('active');
        }
    });

});
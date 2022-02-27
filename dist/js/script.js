window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    let cart = {
        'lamb': {'count': 0, 'price': 620},
        'turkey': {'count': 0, 'price': 450},
        'goose': {'count': 0, 'price': 7900},
        'duck': {'count': 0, 'price': 3230}
    };

    const menuPanel = document.querySelector('.menu__panel'),
          menuItems = menuPanel.querySelectorAll('.menu__item'),
          cardsWrapper = document.querySelector('.menu__cards'),
          cards = cardsWrapper.querySelectorAll('.card'),
          adds = cardsWrapper.querySelectorAll('.add');
    
    // click on tabs
    menuPanel.addEventListener('click', (e) => {
        if (e.target.classList.contains('menu__item')) {
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            e.target.classList.add('active');
        }
    });

    // click in add on cart 
    adds.forEach((add, i) => {
        add.addEventListener('click', () => {
            cards[i].classList.add('active');
        });
    });
});
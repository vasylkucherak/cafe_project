window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    // об'єкт з кількістю товарів у корзині
    let cart = {
        'lamb': {'count': 0, 'price': 620},
        'turkey': {'count': 0, 'price': 450},
        'goose': {'count': 0, 'price': 7900},
        'duck': {'count': 0, 'price': 3230}
    };
    // витягування елементів html
    const headerCounter = document.querySelector('.header__basket-counter'),  // лічильник товарів корзини
          menuPanel = document.querySelector('.menu__panel'),   // область табів
          menuItems = menuPanel.querySelectorAll('.menu__item'),  // таби
          cardsWrapper = document.querySelector('.menu__cards'),  // область карток
          cards = cardsWrapper.querySelectorAll('.card');  // кожна картка
    
    headerCounter.innerHTML = 0;
    // клік на таби
    menuPanel.addEventListener('click', (e) => {   // при кліку на область табів
        if (e.target.classList.contains('menu__item')) {  // якщо ми клікнули на таб (елемент з класом .menu__item)
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));  // перебираємо таби і в кожному видаляємо клас active
            e.target.classList.add('active');  // даємо клас active лиш на той таб на котрий натиснули
        }
    });
    // взаємодія з картками
    cards.forEach(card => {
        // витягування елементів кожної картки
        const id = card.dataset.id,
                  counter = card.querySelector('.card__counter'),
                  price = card.querySelector('.price'),
                  add = card.querySelector('.add'),
                  minus = card.querySelector('.minus'),
                  plus = card.querySelector('.plus');
        // функція оновлення ціни на картці
        const setPrice = () => {
            price.innerHTML = `${cart[id]['price']} &#8381`;
        }
        // встановлюємо початкову ціну
        setPrice();
        // навішуємо всі кліки на картку
        card.addEventListener('click', (e) => {
            // клік на кнопку додати до корзини
            if (e.target == add || e.target.classList.contains('add__icon')) { // якщо ми натиснули на кнопку додати до корзини
                counter.innerHTML = 1; // у лічильнику встановлюємо значення 1
                cart[id]['count'] = 1;  // у масив корзину записуємо кількість 1
                card.classList.add('active');  // картку робимо активною
                headerCounter.innerHTML++;
            }
            // клік на кнопку "+"
            if (e.target == plus || e.target.classList.contains('plus__icon')) { // якщо ми натиснули на кнопку '+'
                counter.innerHTML++;  // значення лічильника збільшуємо на 1
                cart[id]['count']++;  // значення у масиві корзині збільшуємо на 1
                let sumPrice = cart[id]['price'] * cart[id]['count'];
                price.innerHTML = `${sumPrice} &#8381`;
                headerCounter.innerHTML++;
            }
            // клік на кнопку "-"
            if (e.target == minus || e.target.classList.contains('minus__icon')) { // якщо ми натиснули на кнопку '+'
                if (counter.innerHTML == 1) {  // якщо до кліку на "-" у лічильнику було 1
                    card.classList.remove('active');  // картку робимо  не активною
                    cart[id]['count'] = 0;  // значення у масиві корзині 0
                    setPrice();
                    headerCounter.innerHTML--;
                    return;
                }
                counter.innerHTML--;  // значення лічильника зменшуємо на 1
                cart[id]['count']--;  // значення у масиві корзині зменшуємо на 1
                let sumPrice = cart[id]['price'] * cart[id]['count'];
                price.innerHTML = `${sumPrice} &#8381`;
                headerCounter.innerHTML--;
            }
        });
    });

    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {

        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector);

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                if (destroy) {
                    item.remove();
                }

                openModal(modalSelector);
            });
        });

        close.addEventListener('click', () => {
            closeModal(modalSelector);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modalSelector);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.code === "Escape" && modal.style.display == "block") { 
                closeModal(modalSelector);
            }
        });
    }

    function openModal(selector) {
        const scroll = calcScroll();
        document.querySelector(selector).style.display = "block";
        document.body.style.overflow = "hidden";
        document.body.style.marginRight = `${scroll}px`;
    }

    function closeModal(selector) {
        document.querySelector(selector).style.display = "none";
        document.body.style.overflow = ""; 
        document.body.style.marginRight = `0px`;
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    bindModal('[data-modal]', '.modal', '[data-close]');
});
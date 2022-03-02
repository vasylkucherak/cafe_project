window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    // об'єкт з кількістю товарів у корзині
    let cart = {
        'lamb': {'count': 0, 'price': 1620, 'title': 'Ягненок', 'weight': 750, 'descr': 'Фаршированный гречневой кашей,<br>курагой, апельсином и зеленым яблоком', 'class': 'meat'},
        'turkey': {'count': 0, 'price': 1450, 'title': 'Индейка', 'weight': 650, 'descr': 'Фаршированный гречневой кашей,<br>курагой, апельсином и зеленым яблоком', 'class': 'meat'},
        'fish': {'count': 0, 'price': 1900, 'title': 'Рыба', 'weight': 775, 'descr': 'Фаршированная яблоками и лимоном', 'class': 'fish'},
        'duck': {'count': 0, 'price': 1230, 'title': 'Утка', 'weight': 525, 'descr': 'Фаршированная рисом, курагой и айвой', 'class': 'meat'},
        'pepperoni': {'count': 0, 'price': 1100, 'title': 'Пицца "Пепперони"', 'weight': 500, 'descr': 'Кальмары, мидии, креветки, сыр маасдам, красный лук, микс оливок, базилик, соус песто', 'class': 'warm'}
    };
    // витягування елементів html
    const headerCounter = document.querySelector('.header__basket-counter'),  // лічильник товарів корзини
          cardsWrapper = document.querySelector('.menu__cards');  // область карток
    // встановлення лічильника на 0
    headerCounter.innerHTML = 0;
    //============================ РЕНДЕР КАРТОК МЕНЮ =============================================================
    // рендер карток меню
    const renderMenu = () => {
        for (let key in cart) {
            const menuCard = document.createElement('div');
            menuCard.innerHTML = `
                <div class="card all ${cart[key]['class']}" data-id="${key}">
                    <div class="card__cheked">
                        <img src="./icons/checked.svg" alt="check">
                    </div>
                    <img src="./img/cards/${key}.png" class="card__img"></img>
                    <div class="card__text">
                        <div class="title">${cart[key]['title']}</div>
                        <div class="weight">Вес: ${cart[key]['weight']} г</div>
                        <div class="descr">${cart[key]['descr']}</div>
                    </div>
                    <div class="card__calc">
                        <div class="price">${cart[key]['price']} &#8381</div>
                        <div class="add">В корзину
                            <img class="add__icon" src="./icons/buy.svg" alt="add">
                        </div>
                        <div class="del">Удалить
                            <img class="del__icon" src="./icons/buy.svg" alt="delete">
                        </div>
                    </div>
                </div>
            `
            cardsWrapper.append(menuCard);
        }
    }
    renderMenu();

    //===================================== ТАБИ ========================================================
    const menuPanel = document.querySelector('.menu__panel'),   // область табів
          menuItems = menuPanel.querySelectorAll('.menu__item');  // таби
          
    menuPanel.addEventListener('click', (e) => {   // при кліку на область табів
        if (e.target.classList.contains('menu__item')) {  // якщо ми клікнули на таб (елемент з класом .menu__item)
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));  // перебираємо таби і в кожному видаляємо клас active
            e.target.classList.add('active');  // даємо клас active лиш на той таб на котрий натиснули
        }
    });

    //===================================== КНОПКИ МЕНЮ ================================================= 
    const cards = cardsWrapper.querySelectorAll('.card');  // кожна сформована картка меню

    cards.forEach(card => {
        const id = card.dataset.id,
              add = card.querySelector('.add'),
              del = card.querySelector('.del');
        card.addEventListener('click', (e) => {
            // клік на кнопку додати до корзини
            if (e.target == add || e.target.classList.contains('add__icon')) { // якщо ми натиснули на кнопку додати до корзини
                card.classList.add('active');  // картку робимо активною
                headerCounter.innerHTML++;  // плюсуємо значення лічильника
                cart[id]['count'] = 1;  // у масив корзину записуємо кількість 1
            }
            // клік на кнопку видалити
            if (e.target == del || e.target.classList.contains('del__icon')) { // якщо ми натиснули на кнопку видалити
                card.classList.remove('active');  // картку робимо не активною
                headerCounter.innerHTML--;  // мінусуємо значення лічильника
                cart[id]['count'] = 0;  // у масив корзину записуємо кількість 0
            }
        });
    })

    //==================== ВІДКРИТТЯ МОДАЛЬНОГО ВІКНА ===================================================
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
        renderCart();
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

    //============================ РЕНДЕР КАРТОК КОРЗИНИ =============================================================
    // рендер елементів корзини
    const renderCart = () => {
        const headerCounter = document.querySelector('.header__basket-counter'),
              order = document.querySelector('.order'),
              empty = order.querySelector('.order__empty');

        while (order.children.length != 1) {   // поки не лишиться 1 елемент (це order__empty)
            order.removeChild(order.lastChild);  // видаляємо всі картки
        }
        if (headerCounter.innerHTML == 0) {
            empty.style.display = 'flex';
        } else {
            empty.style.display = 'none';            
            for (let key in cart) {
                if (cart[key]['count'] != 0) {
                    const cartCard = document.createElement('div');
                    cartCard.classList.add('order__item');
                    cartCard.innerHTML = ` 
                        <img src="./img/cards/${key}.png" alt="${key}">
                        <div class="dish">
                            <div class="text">
                                <h2 class="title">${cart[key]['title']}</h2>
                                <div class="descr">${cart[key]['descr']}</div>
                            </div>
                            <div class="calc">
                                <div class="counter">
                                    <div class="minus">
                                        <img class="minus__icon" src="./icons/minus.svg" alt="minus">
                                    </div>
                                    <div class="count">${cart[key]['count']}</div>
                                    <div class="plus">
                                        <img class="plus__icon" src="./icons/plus.svg" alt="plus">
                                    </div>
                                </div>
                                <div class="res">
                                    <div class="price">${cart[key]['price'] * cart[key]['count']} &#8381</div>
                                    <div class="delete">&times;</div>
                                </div>
                            </div>
                        </div>
                        <div class="divider"></div>
                    `
                    order.append(cartCard);
                }   
            } 
        }
    }
    renderCart();
});

/*     //============================ МЕНЮ =============================================================
   


    //==================== КНОПКИ МЕНЮ ================================================= 
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
        // навішуємо всі кліки на картку
        card.addEventListener('click', (e) => {
            // клік на кнопку додати до корзини
            if (e.target == add || e.target.classList.contains('add__icon')) { // якщо ми натиснули на кнопку додати до корзини
                counter.innerHTML = 1; // у лічильнику встановлюємо значення 1
                cart[id]['count'] = 1;  // у масив корзину записуємо кількість 1
                card.classList.add('active');  // картку робимо активною
                headerCounter.innerHTML++;
                renderCart();
            }
            // клік на кнопку "+"
            if (e.target == plus || e.target.classList.contains('plus__icon')) { // якщо ми натиснули на кнопку '+'
                counter.innerHTML++;  // значення лічильника збільшуємо на 1
                cart[id]['count']++;  // значення у масиві корзині збільшуємо на 1
                let sumPrice = cart[id]['price'] * cart[id]['count'];
                price.innerHTML = `${sumPrice} &#8381`;
                headerCounter.innerHTML++;
                renderCart();
            }
            // клік на кнопку "-"
            if (e.target == minus || e.target.classList.contains('minus__icon')) { // якщо ми натиснули на кнопку '+'
                if (counter.innerHTML == 1) {  // якщо до кліку на "-" у лічильнику було 1
                    card.classList.remove('active');  // картку робимо  не активною
                    cart[id]['count'] = 0;  // значення у масиві корзині 0
                    setPrice();
                    headerCounter.innerHTML--;
                    renderCart();
                    return;
                }
                counter.innerHTML--;  // значення лічильника зменшуємо на 1
                cart[id]['count']--;  // значення у масиві корзині зменшуємо на 1
                let sumPrice = cart[id]['price'] * cart[id]['count'];
                price.innerHTML = `${sumPrice} &#8381`;
                headerCounter.innerHTML--;
                renderCart();
            }
        });
    }); */
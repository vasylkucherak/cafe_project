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
    const headerCounter = document.querySelector('.header__basket-counter'),  // лічильник шапки
          cardsWrapper = document.querySelector('.menu__cards');  // область карток
    // встановлення лічильника шапки на 0
    headerCounter.innerHTML = 0;

    //============================ РЕНДЕР КАРТОК МЕНЮ =============================================================
    const renderMenu = () => {
        for (let key in cart) {  // перебираємо об'єкт даних
            const menuCard = document.createElement('div');  // шаблон картки
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
            cardsWrapper.append(menuCard);  // додаємо картку в область карток меню
        }
    }
    renderMenu();  // рендеримо картки меню перший раз

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

    cards.forEach(card => {  // перебираємо картки меню
        const id = card.dataset.id,  // код товару
              add = card.querySelector('.add'),  // кнопка додати до кошика
              del = card.querySelector('.del');  // кнопка видалити з кошика
        card.addEventListener('click', (e) => {  // подія кліку на картку
            // клік на кнопку додати до корзини
            if (e.target == add || e.target.classList.contains('add__icon')) { // якщо ми натиснули на кнопку додати до корзини
                card.classList.add('active');  // картку робимо активною
                headerCounter.innerHTML++;  // плюсуємо значення лічильника
                cart[id]['count'] = 1;  // у масив корзини записуємо кількість 1
            }
            // клік на кнопку видалити
            if (e.target == del || e.target.classList.contains('del__icon')) { // якщо ми натиснули на кнопку видалити
                card.classList.remove('active');  // картку робимо не активною
                headerCounter.innerHTML--;  // мінусуємо значення лічильника
                cart[id]['count'] = 0;  // у масив корзини записуємо кількість 0
            }
        });
    });

    const clearActive = (key) => {  // функція зняття активності картки меню коли її видплили у кошику
        const cards = document.querySelectorAll('.card');  // кожна сформована картка меню
        cards.forEach(card => {  // перебираємо картки меню
            if (card.dataset.id == key) {  // якщо код товару співпадає з кодом видаленого товару у кошику
                card.classList.remove('active');  // то знімаємо активність у цієї картки меню
            }
        });
    }

    //==================== ВІДКРИТТЯ МОДАЛЬНОГО ВІКНА ===================================================
    function bindModal(triggerSelector, modalSelector, closeSelector, submitSelector, closeOnModalClick = false) {

        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            submit = document.querySelector(submitSelector);

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }
                if (!item.classList.contains('blocked')) {
                    openModal(modalSelector);
                }
            });
        });

        close.addEventListener('click', () => {
            closeModal(modalSelector);
        });

        
        submit.addEventListener('click', () => {
            if (!submit.classList.contains('blocked')) {
                closeModal(modalSelector);
            }
        });

        if (closeOnModalClick) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal(modalSelector);
                }
            });
        }

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
    bindModal('[data-modal]', '.modal', '[data-close]', '#firstSubmit', true);
    bindModal('[data-secondModal]', '.secondModal', '[data-secondClose]', '#secondSubmit');

    //============================ РЕНДЕР КОРЗИНИ =============================================================
    const renderCart = () => {
        const headerCounter = document.querySelector('.header__basket-counter'),  // лічильник шапки
              order = document.querySelector('.order'),  // область карток корзини
              empty = order.querySelector('.order__empty');  // заглушка коли не вибрано жодного товару
        let toggleMinus;  // змінна котра міняє активність кнопку '-' (коли товарів 1шт. то кнопка не активна)

        while (order.children.length != 1) {   // поки не лишиться 1 елемент (це якраз заглушка order__empty)
            order.removeChild(order.lastChild);  // видаляємо всі картки
        }
        if (headerCounter.innerHTML == 0) {  // якщо лічильник шапки із значенням 0
            empty.style.display = 'flex';  // показуємо заглушку
        } else {                              // інакше
            empty.style.display = 'none';     // не показуємо заглушку 
            for (let key in cart) {             // для кожного ключа товару у базі даних корзини
                if (cart[key]['count'] != 0) {  // якщо значення кількості не нульове то ми продовжуємо
                    if (cart[key]['count'] == 1) {  // якщо кількість 1шт
                        toggleMinus = '<div class="minus-gray"><img src="./icons/minus.svg" alt="minus"></div>';  // то записуємо у змінну кнопки '-' активний елемент
                    } else {  // інакше
                        toggleMinus = '<div class="minus"><img class="minus__icon" src="./icons/minus.svg" alt="minus"></div>';  // то записуємо у змінну кнопки '-' не активний елемент
                    }
                    const cartCard = document.createElement('div');  // шаблон картки у корзині
                    cartCard.innerHTML = ` 
                        <div class="order__item" data-id="${key}">
                            <img src="./img/cards/${key}.png" alt="${key}">
                            <div class="dish">
                                <div class="text">
                                    <h2 class="title">${cart[key]['title']}</h2>
                                    <div class="descr">${cart[key]['descr']}</div>
                                </div>
                                <div class="calc">
                                    <div class="counter">
                                        ${toggleMinus}
                                        <div class="count">${cart[key]['count']}</div>
                                        <div class="plus">
                                            <img class="plus__icon" src="./icons/plus.svg" alt="plus">
                                        </div>
                                    </div>
                                    <div class="res">
                                        <div class="price">${cart[key]['price'] * cart[key]['count']} &#8381</div>
                                        <div class="del">&times;</div>
                                    </div>
                                </div>
                            </div>
                            <div class="divider"></div>
                        </div>
                    `
                    order.append(cartCard);  // додаємо картку в область карток корзини
                }   
            } 
        }
        onCart();  // запускаємо функцію для зчитування кліку на кнопки (переписуємо orderCards, бо кожен раз після рендеру карток їх є різна кількість)
    }



    //===================================== КНОПКИ КОРЗИНИ ================================================= 
    const onCart = () => {
        const orderCards = document.querySelectorAll('.order__item');  // кожна сформована картка корзини (кожен раз після рендеру містить різну кількість карток)
        sumPrice(orderCards);
        orderCards.forEach(orderCard => {  // перебираємо ці картки
            const id = orderCard.dataset.id,// код товару
                minus = orderCard.querySelector('.minus'),  // кнопка '-'
                count = orderCard.querySelector('.count'),  // лічильник картки
                plus = orderCard.querySelector('.plus'),  // кнопка '+'
                price = orderCard.querySelector('.price'),  // панель з ціною картки
                del = orderCard.querySelector('.del');  // кнопка видалення картки

            orderCard.addEventListener('click', (e) => {  // подія кліку на картку
                // клік на кнопку '-'
                if (e.target == minus || e.target.classList.contains('minus__icon')) { // якщо ми натиснули на кнопку '-'
                    if (count.innerHTML == 2) {  // і при цьому у лічильнику картки було значення 2
                        cart[id]['count']--;  // то значення у масиві корзини зменшуємо на 1
                        renderCart();  // перезапускаємо рендер карток, (щоб підставилась неактивна кнопка)
                        return;  // виходимо з умови
                    }  // інакше
                    count.innerHTML--;  // значення лічильника зменшуємо на 1
                    cart[id]['count']--;  // значення у масиві корзини зменшуємо на 1
                    price.innerHTML = `${cart[id]['price'] * cart[id]['count']} &#8381`;  // встановлюємо поточну ціну (ціна * кількість)
                    sumPrice(orderCards);
                }
                // клік на кнопку '+'
                if (e.target == plus || e.target.classList.contains('plus__icon')) {  // якщо ми натиснули на кнопку '+'
                    if (count.innerHTML == 1) {  // і при цьому у лічильнику картки було значення 1
                        cart[id]['count']++;  // то значення у масиві корзини збільшуємо на 1
                        renderCart();  // перезапускаємо рендер карток, (щоб підставилась активна кнопка)
                        return;  // виходимо з умови
                    }  // інакше
                    count.innerHTML++;  // значення лічильника збільшуємо на 1
                    cart[id]['count']++;  // значення у масиві корзини збільшуємо на 1
                    price.innerHTML = `${cart[id]['price'] * cart[id]['count']} &#8381`;  // встановлюємо поточну ціну (ціна * кількість)
                    sumPrice(orderCards);
                }
                // клік на кнопку видалити
                if (e.target == del || e.target.classList.contains('del__icon')) { // якщо ми натиснули на кнопку видалити
                    headerCounter.innerHTML--;  // мінусуємо значення лічильника шапки
                    cart[id]['count'] = 0;  // у масив корзину записуємо кількість 0
                    renderCart();  // перезапускаємо рендер карток, (щоб видалилася поточна картка)
                    clearActive(id);  // запускаємо функцію котра зніме активність картки меню
                }
            });
        });
    }
    // функція для перерахунку загальної суми
    const sumPrice = (selectors) => {
        const finishPrice = document.querySelector('.sum__price'),  // лічильник загальної суми
              button = document.querySelector('#firstSubmit');  // кнопка "оформить заказ"
        let newPrice = 0;  // загальна сума після оновлення  // змінна оновленої суми
        
        selectors.forEach((selector) => {
            const price = selector.querySelector('.price');
            newPrice += +(price.innerHTML.slice(0,-2));
        });
        finishPrice.innerHTML = `${newPrice} &#8381`;

        if (newPrice >= 1500) {
            button.classList.remove('blocked');
            finishPrice.classList.remove('danger');
        } else {
            button.classList.add('blocked');
            finishPrice.classList.add('danger');
        }
    }
});
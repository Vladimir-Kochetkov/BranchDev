"use strict";
const title = prompt('Как называется наш проект?'),
    screens = prompt('Какие типы экранов нужно разработать?', 'Простые'),
    screenPrice = +prompt('Сколько будет стоить данная работа?', '12000'),
    rollback = 55,
    adaptive = confirm('Нужен ли адаптив на сайте?'),
    service1 = prompt('Какой дополнительный тип услуги нужен?'),
    servicePrice1 = +prompt('Сколько это будет стоить?', '2000'),
    service2 = prompt('Какой дополнительный тип услуги нужен?'),
    servicePrice2 = +prompt('Сколько это будет стоить?', '3000');


const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
};

const getAllServicePrices = function () {
    return servicePrice1 + servicePrice2;
};

const allServicePrices = getAllServicePrices(),//8000
    fullPrice = getFullPrice();

function getFullPrice() {
    return screenPrice + allServicePrices;
}

const getTitle = function () {
    return (title.charAt(0).toUpperCase() + title.substring(1).toLowerCase()).trim();
};

const getServicePercentPrices = function () {
    return Math.ceil(fullPrice - 2000);
};

const servicePercentPrice = getServicePercentPrices();

const getRollbackMessage = function (price) {
    if (price >= 30000) {
        return "Даём скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
        return "Даём скидку в 5%";
    } else if (price < 15000 && price > 0) {
        return "Скидка не предусмотрена";
    } else if (price < 0) {
        return "Что то пошло не так";
    }
};


showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(getRollbackMessage(fullPrice));

console.log(screens.length);
console.log("Стоимость верстки экранов " + screenPrice + " рублей");
console.log("Стоимость разработки сайта " + fullPrice + " рублей");
console.log(screens.toLowerCase().split(", "));
console.log(fullPrice * (rollback / 100));
console.log(servicePercentPrice);
console.log(screens.split());
console.log(getTitle());  
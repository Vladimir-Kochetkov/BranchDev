"use strict";
let title,
    screens,
    screenPrice,
    adaptive,

    rollback = 10,
    fullPrice,
    allServicePrices,
    servicePercentPrice,
    service1,
    service2;

const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
    title = prompt('Как называется наш проект?', "Калькулятор вёрстки");
    screens = prompt('Какие типы экранов нужно разработать?', 'Простые');

    do {
        screenPrice = prompt('Сколько будет стоить данная работа?', '12000');
    } while (!isNumber(screenPrice));

    adaptive = confirm('Нужен ли адаптив на сайте?');
};

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
};

const getAllServicePrices = function () {
    let sum = 0;
    let c;
    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            service1 = prompt('Какой дополнительный тип услуги нужен?');
            do {
                c = prompt('Сколько это будет стоить?', '2000');
            } while (!isNumber(c));
            sum += +c;
            console.log(sum);
        } else if (i === 1) {
            service2 = prompt('Какой дополнительный тип услуги нужен?');
            do {
                c = prompt('Сколько это будет стоить?', '2000');
            } while (!isNumber(c));
            sum += +c;
            console.log(sum);
        }
    }
    return sum;
};

function getFullPrice() {
    return +screenPrice + allServicePrices;
}

const getTitle = function (str) {
    for (let i = 0; i < str.length;) {
        if (str[i] == " ") {
            i++;
        } else {
            return str[i].toUpperCase() + str.slice(i + 1).toLowerCase();
        }
    }
};

const getServicePercentPrices = function () {
    return fullPrice - (fullPrice * (rollback / 100));
};

const getRollbackMessage = function (price) {
    if (price >= 30000) {
        return "Даём скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
        return "Даём скидку в 5%";
    } else if (price < 15000 && price >= 0) {
        return "Скидка не предусмотрена";
    } else if (price < 0) {
        return "Что то пошло не так";
    }
};

asking();
allServicePrices = getAllServicePrices();//8000
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log("allServicePrices", allServicePrices);

console.log(getRollbackMessage(fullPrice));
console.log(typeof title);
console.log(typeof screenPrice);
console.log(typeof adaptive);

console.log(screens.length);
console.log("Стоимость верстки экранов " + screenPrice + " рублей");
console.log("Стоимость разработки сайта " + fullPrice + " рублей");
console.log(screens.toLowerCase().split(", "));
console.log(servicePercentPrice);
console.log(screens.split());
console.log(getTitle(title));  
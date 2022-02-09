"use strict";
const heading = document.getElementsByTagName('h1')[0],
    calculator = document.getElementsByClassName("handler_btn")[0],
    reset = document.getElementsByClassName("handler_btn")[1],
    screenBtn = document.querySelector('.screen-btn'),
    otheritemsPercent = document.querySelectorAll(".other-items.percent"),
    otheritemsNumber = document.querySelectorAll(".other-items.number"),
    inputRollback = document.querySelector('.rollback').querySelector('input'),
    spanRollback = document.querySelector('.rollback').querySelector('span'),
    costLayout = document.getElementsByClassName('total-input')[0],
    numberScreens = document.getElementsByClassName('total-input')[1],
    costAdditionalServices = document.getElementsByClassName('total-input')[2],
    totalCost = document.getElementsByClassName('total-input')[3],
    costRollback = document.getElementsByClassName('total-input')[4];
let blocksScreen = document.querySelectorAll('.screen');
console.log(calculator);
console.log(reset);
console.log(costLayout);
console.log(numberScreens);
console.log(costAdditionalServices);
console.log(totalCost);
console.log(costRollback);

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 10,
    fullPrice: 0,
    allServicePrices: 0,
    servicePercentPrice: 0,
    services: {},
    isString: function (str) {
        return str.trim() === '' || parseInt(str);
    },
    asking: function () {
        do {
            appData.title = prompt('Как называется наш проект?', "Калькулятор вёрстки");
        } while (appData.isString(appData.title));


        for (let i = 0; i < 2; i++) {
            let name;
            do {
                name = prompt('Какие типы экранов нужно разработать?', 'Простые');
            } while (appData.isString(name));

            let price = 0;
            do {
                price = +prompt('Сколько будет стоить данная работа?', '12000');
            } while (!appData.isNumber(price));

            appData.screens.push({ id: i, name: name, price: price });
        }

        for (let i = 0; i < 2; i++) {
            let name;
            let price = 0;
            do {
                name = prompt('Какой дополнительный тип услуги нужен?');
            } while (appData.isString(name));


            do {
                price = prompt('Сколько это будет стоить?', '2000');
            } while (!appData.isNumber(price));

            appData.services[i + ' ' + name] = +price;

        }

        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }


        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },
    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num) || null;
    },
    getFullPrice: function () {
        appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
    },
    getTitle: function () {
        appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substr(1).toLowerCase();
    },
    getServicePercentPrices: function () {
        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
    },
    getRollbackMessage: function (price) {
        if (price >= 30000) {
            return "Даём скидку в 10%";
        } else if (price >= 15000 && price < 30000) {
            return "Даём скидку в 5%";
        } else if (price < 15000 && price >= 0) {
            return "Скидка не предусмотрена";
        } else if (price < 0) {
            return "Что то пошло не так";
        }
    },
    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
        console.log(appData.screenPrice);
    },
    start: function () {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.getTitle();
        appData.logger();
    },

};
appData.start();
const result = appData.screens.reduce(function (sum, item) {
    return sum + item.price;
}, 0);
console.log(result);


"use strict";

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    rollback: 10,
    fullPrice: 0,
    allServicePrices: 0,
    servicePercentPrice: 0,
    service1: '',
    service2: '',
    asking: function () {
        appData.title = prompt('Как называется наш проект?', "Калькулятор вёрстки");
        appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые');

        do {
            appData.screenPrice = prompt('Сколько будет стоить данная работа?', '12000');
        } while (!appData.isNumber(appData.screenPrice));
        appData.screenPrice = parseInt(appData.screenPrice);

        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num) || null;
    },
    getAllServicePrices: function () {
        let sum = 0;
        let temp;
        for (let i = 0; i < 2; i++) {
            if (i === 0) {
                appData.service1 = prompt('Какой дополнительный тип услуги нужен?');
                do {
                    temp = prompt('Сколько это будет стоить?', '2000');
                } while (!appData.isNumber(temp));
                sum += +temp;
            } else if (i === 1) {
                appData.service2 = prompt('Какой дополнительный тип услуги нужен?');
                do {
                    temp = prompt('Сколько это будет стоить?', '2000');
                } while (!appData.isNumber(temp));
                sum += +temp;
            }
        }
        return sum;
    },
    getFullPrice: function () {
        return +appData.screenPrice + appData.allServicePrices;
    },
    getTitle: function () {
        return appData.title.trim()[0].toUpperCase() + appData.title.trim().substr(1).toLowerCase();
    },
    getServicePercentPrices: function () {
        return appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
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
        for (let key in appData) {
            console.log(`Метод: ${key}`);
        }
    },
    start: function () {
        appData.asking();
        appData.allServicePrices = appData.getAllServicePrices();//8000
        appData.fullPrice = appData.getFullPrice();
        appData.servicePercentPrice = appData.getServicePercentPrices();
        appData.title = appData.getTitle();
        appData.logger();
    },

};
appData.start();


"use strict";
const title = document.getElementsByTagName('h1')[0],
    startBtn = document.getElementsByClassName("handler_btn")[0],
    resetBtn = document.getElementsByClassName("handler_btn")[1],
    buttonPlus = document.querySelector('.screen-btn'),
    otheritemsPercent = document.querySelectorAll(".other-items.percent"),
    otheritemsNumber = document.querySelectorAll(".other-items.number"),

    inputRollback = document.querySelector('.rollback').querySelector('input'),
    spanRollback = document.querySelector('.rollback').querySelector('span'),

    total = document.getElementsByClassName('total-input')[0],
    numberScreens = document.getElementsByClassName('total-input')[1],
    totalCountOther = document.getElementsByClassName('total-input')[2],
    fullTotalCount = document.getElementsByClassName('total-input')[3],
    costRollback = document.getElementsByClassName('total-input')[4];
const selects = document.getElementsByClassName('element')[0].getElementsByTagName('select');
const input = document.querySelector('input[type=text]');
const inputs = document.getElementsByClassName('element')[0].getElementsByTagName('input');
const select = document.querySelectorAll('.views-select');
let screens = document.querySelectorAll('.screen');

console.log(input);
const sliderBar = function (event) {
    spanRollback.textContent = event.target.value;
    appData.rollback = event.target.value;
    costRollback.value = +appData.fullPrice - (appData.fullPrice * (event.target.value / 100));
};

inputRollback.addEventListener('input', sliderBar);

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 0,
    fullPrice: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    servicesPercent: {},
    servicesNumber: {},
    counts: 0,
    isError: false,
    addTitle: function () {
        document.title = title.textContent;
    },
    addScreens: function () {
        screens = document.querySelectorAll('.screen');
        screens.forEach(function (screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value,
            });
        });
        console.log(appData.screens);
    },
    addServices: function () {
        const newArray = [...selects, ...inputs];
        console.log(newArray);
        appData.isError = false;
        newArray.forEach(select => {
            if (select.value === "") {
                appData.isError = true;
            }

            otheritemsPercent.forEach(function (item) {
                const check = item.querySelector('input[type=checkbox]');
                const label = item.querySelector('label');
                const input = item.querySelector('input[type=text]');

                if (check.checked) {
                    appData.servicesPercent[label.textContent] = +input.value;
                }

            });
            otheritemsNumber.forEach(function (item) {
                const check = item.querySelector('input[type=checkbox]');
                const label = item.querySelector('label');
                const input = item.querySelector('input[type=text]');

                if (check.checked) {
                    appData.servicesNumber[label.textContent] = +input.value;
                }
            });
        });
        if (!appData.isError) {
            appData.start();
        }
    },
    addScreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true);

        screens[screens.length - 1].after(cloneScreen);
    },
    isString: function (str) {
        return str.trim() === '' || parseInt(str);
    },
    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }

        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        }

        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
        }

        for (let key of appData.screens) {
            appData.counts += key.count;
        }

        appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;

        appData.servicePercentPrice = +appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
    },
    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
        console.log(appData.screenPrice);
    },
    start: function () {

        appData.addScreens();
        //appData.addServices();

        appData.addPrices();
        /*appData.getServicePercentPrices(); 
        appData.logger(); */
        appData.showResult();
    },
    showResult: function () {
        total.value = appData.screenPrice;
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
        fullTotalCount.value = appData.fullPrice;
        costRollback.value = appData.servicePercentPrice;
        numberScreens.value = appData.counts;
    },
    init: function () {
        appData.addTitle();
        startBtn.addEventListener('click', (e) => {
            e.preventDefault();
            appData.addServices();
        });
        buttonPlus.addEventListener('click', appData.addScreenBlock);
    },
};
appData.init();

const result = appData.screens.reduce(function (sum, item) {
    return sum + item.price;
}, 0);


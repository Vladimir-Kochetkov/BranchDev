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
const selects = document.getElementsByClassName('element')[0].querySelectorAll('select');
const selects1 = document.getElementsByClassName('element')[0].getElementsByTagName('select');
const input = document.querySelector('input[type=text]');
const inputs = document.getElementsByClassName('element')[0].querySelectorAll('input');
const inputs1 = document.getElementsByClassName('element')[0].getElementsByTagName('input');
const inputsCheck = document.getElementsByClassName('element')[1].querySelectorAll('input[type=checkbox]');
const select = document.querySelectorAll('.main-controls_views')[0];
let screens = document.getElementsByClassName('screen');
const totalServices = document.getElementsByClassName('main-total')[0].getElementsByTagName('input');
const cms = document.querySelector('.cms').querySelector('input');

console.log(cms);
const sliderBar = event => {
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
        console.log(this.screens);
    },
    addServices: function () {
        const newArray = [...selects, ...inputs];
        console.log(newArray);
        this.isError = false;
        newArray.forEach(select => {
            if (select.value === "") {
                this.isError = true;
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
        if (!this.isError) {
            this.start();
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
        for (let screen of this.screens) {
            this.screenPrice += +screen.price;
        }

        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }

        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
        }

        for (let key of this.screens) {
            this.counts += key.count;
        }

        this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

        this.servicePercentPrice = +this.fullPrice - (this.fullPrice * (this.rollback / 100));
    },
    logger: function () {
        console.log(this.fullPrice);
        console.log(this.servicePercentPrice);
        console.log(this.screens);
        console.log(this.screenPrice);
    },
    blockInputs: (disabled = true) => {
        for (let i = 0; i < inputs1.length; i++) {
            inputs1[i].disabled = disabled;
        }
        for (let i = 0; i < selects1.length; i++) {
            selects1[i].disabled = disabled;
        }
        buttonPlus.disabled = disabled;

    },
    start: function () {

        this.addScreens();
        //appData.addServices();

        this.addPrices();
        /*appData.getServicePercentPrices(); 
        appData.logger(); */
        this.showResult();
        if (startBtn.textContent === 'Рассчитать') {
            this.blockInputs();
            startBtn.textContent = 'Сбросить';
        } else {
            startBtn.textContent = 'Рассчитать';
            this.reset();
        }
    },
    reset: function () {
        for (let i = screens.length - 1; i > 0; i--) {
            screens[i].parentNode.removeChild(screens[i]);
        }

        buttonPlus.style.display = '';
        this.blockInputs(false);
        inputs.forEach(item => {
            item.value = '';
        });
        selects.forEach(item => {
            item.value = '';
        });
        for (let i = 0; i < inputsCheck.length; i++) {
            inputsCheck[i].checked = false;
        }
        inputRollback.value = spanRollback.textContent = 0;

        for (let i = 0; i < totalServices.length; i++) {
            totalServices[i].value = 0;
        }
        cms.checked = false;
    },
    showResult: function () {
        total.value = this.screenPrice;
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
        fullTotalCount.value = this.fullPrice;
        costRollback.value = this.servicePercentPrice;
        numberScreens.value = this.counts;
    },
    init: function () {
        this.addTitle();
        startBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.addServices();
        });
        buttonPlus.addEventListener('click', this.addScreenBlock);
    },
};
appData.init();

const result = appData.screens.reduce(function (sum, item) {
    return sum + item.price;
}, 0);


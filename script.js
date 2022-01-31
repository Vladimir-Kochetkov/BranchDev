"use strict";
let title = "Калькулятор вёрстки",
    screens = "Простые, Сложные, Интерактивные",
    screenPrice = 18000,
    rollback = 55,
    fullPrice = 30000,
    adaptive = true;
alert('Первое задание по JS!');
console.log('Hello world!');

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log("Стоимость верстки экранов " + screenPrice + " рублей");
console.log("Стоимость разработки сайта " + fullPrice + " рублей");
console.log(screens.toLowerCase().split(", "));
console.log(fullPrice * (rollback / 100));

title = prompt('Как называется наш проект?');
screens = prompt('Какие типы экранов нужно разработать?', 'Простые');
screenPrice = +prompt('Сколько будет стоить данная работа?', '12000');
adaptive = confirm('Нужен ли адаптив на сайте?');

let service1 = prompt('Какой дополнительный тип услуги нужен?'),
    servicePrice1 = +prompt('Сколько это будет стоить?'),
    service2 = prompt('Какой дополнительный тип услуги нужен?'),
    servicePrice2 = +prompt('Сколько это будет стоить?');

fullPrice = screenPrice + servicePrice1 + servicePrice2;

let servicePercentPrice = Math.ceil(fullPrice - 2000);
console.log(servicePercentPrice);

if (fullPrice >= 30000) {
    console.log("Даём скидку в 10%");
} else if (fullPrice >= 15000 && fullPrice < 30000) {
    console.log("Даём скидку в 5%");
} else if (fullPrice < 15000 && fullPrice > 0) {
    console.log("Скидка не предусмотрена");
} else if (fullPrice < 0) {
    console.log("Что то пошло не так");
}
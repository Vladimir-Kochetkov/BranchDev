let title = "Калькулятор вёрстки",
    screens = "Простые, Сложные, Интерактивные",
    screenPrice = 129,
    rollback = 55,
    fullPrice = 500,
    adaptive = true;
alert('Первое задание по JS!');
console.log('Hello world!');

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log("Стоимость верстки экранов " + screenPrice + " долларов");
console.log("Стоимость разработки сайта " + fullPrice + " долларов");
console.log(screens.toLowerCase().split(","));
console.log(fullPrice * (rollback / 100));
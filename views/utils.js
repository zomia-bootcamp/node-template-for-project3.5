import myData from '/views/data.js'

document.addEventListener('DOMContentLoaded', function () {
    const $greetingEl = document.getElementsByClassName('greeting');
    $greetingEl[0].innerHTML = 'Hello!';
    console.log(myData);
}, false);



var trigger = document.querySelector(".tooltip");
var elem = document.querySelector(".ascii-art");

trigger.addEventListener("mousedown", function (e) {
    e.preventDefault();
    elem.classList.remove("debounce", "bounce");
    elem.offsetWidth = elem.offsetWidth;
    elem.classList.add("bounce");
}, false);

trigger.addEventListener("mouseup", function (e) {
    e.preventDefault();
    elem.classList.remove("bounce", "debounce");
    elem.offsetWidth = elem.offsetWidth;
    elem.classList.add("debounce");
}, false);
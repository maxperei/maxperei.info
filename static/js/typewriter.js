var logo = document.querySelector('.sidebar-about h1');

var typed,
    target = ".sidebar-about h1 a > span",
    options = {
        cursorChar: "¶",
        contentType: 'html',
        typeSpeed: 35,
        backSpeed: 15,
        loop: false,
        smartBackspace: false,
        fadeOut: false,
    };

var rewind = function () {
    typed.stop();
};

logo
    .addEventListener("mouseenter", function (evt) {
        if (typed instanceof Typed) typed.destroy();
        options.strings = ["axime Pereira-Lima"];
        options.showCursor = true;
        typed = new Typed(target, options);
    });

logo
    .addEventListener("mouseleave", function (evt) {
        var cursor = document.querySelectorAll('.typed-cursor');
        Array.prototype.forEach.call(cursor, function (node) {
            node.parentNode.removeChild(node);
        });
        rewind();
        options.strings = [""];
        options.showCursor = false;
        options.onLastStringBackspaced = function () {
            rewind();
        };
        typed = new Typed(target, options);
    });
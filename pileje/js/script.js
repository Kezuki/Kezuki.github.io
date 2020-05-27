const jsHeaderTop = $('.jsHeaderTop');
const jsHeaderBottom = $('.jsHeaderBottom');
const jsHeaderTopBtn = $('.jsHeaderTopBtn');


var links = document.querySelectorAll('a[data-link]');

for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (e) {
        e.preventDefault();
        location.href = this.getAttribute('data-link');
    })
};

jsHeaderTop.click(function () {
    jsHeaderBottom.fadeToggle(350);
    jsHeaderTopBtn.toggleClass('header__top-btn_act');
});

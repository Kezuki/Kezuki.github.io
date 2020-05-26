const jsHeaderTop = $('.jsHeaderTop');
const jsHeaderBottom = $('.jsHeaderBottom');
const jsHeaderTopBtn = $('.jsHeaderTopBtn');
const jsSwitchItem = $('.jsSwitchItem');
const jsSwitchElem = $('.jsSwitchElem');
const jsHideSwitch = $('.jsHideSwitch');
const jsProductSwitchWrap = $('.jsProductSwitchWrap');


jsHeaderTop.click(function () {
    jsHeaderBottom.fadeToggle(350);
    jsHeaderTopBtn.toggleClass('header__top-btn_act');
});

jsSwitchItem.click(function () {
    var _this = $(this);

    if(_this.hasClass('switch__item_act')) return false;

    jsProductSwitchWrap.css('display', 'block').toggleClass('jsHideSwitchContent');
    $('.jsHideSwitchContent').css('display', 'none');

    jsSwitchElem.toggleClass(jsSwitchElem.data('active'));
    jsSwitchItem.removeClass('switch__item_act');
    _this.addClass('switch__item_act');
    
    jsHideSwitch.removeClass('hide-switch_act').attr('data-text', 'Hide').children('span').text('See all');
});

jsHideSwitch.click(function () {
    var _this = $(this);
    var attr = _this.attr('data-text');
    var content = _this.parents('.jsHideSwitchParent').find('.jsHideSwitchContent');
    
    _this
        .toggleClass('hide-switch_act')
        .attr('data-text', _this.children('span').text())
        .children('span').text(attr);

    content.slideToggle(300);
})
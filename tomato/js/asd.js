window.addEventListener('load', function () {
    const jsViewerBlockItem = document.querySelectorAll('.jsViewerBlockItem');

    window.addEventListener('scroll', function () {
        for (var i = 0; i < jsViewerBlockItem.length; i++) {
            var scroll = window.scrollY;
            var elemStart = i * 50;
            var speed = (scroll - elemStart) / 1.5;

            speed < 0 ? speed = 0 : speed;
            jsViewerBlockItem[i].style.transform = 'translateY(' + -speed + '%)'
        }
    });
})
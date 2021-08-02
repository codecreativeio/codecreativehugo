window.toggleMenu = function() {
    document.querySelector(".menuToggle button").classList.toggle("is-active");
    document.querySelector(".fullNav").classList.toggle("open");
    document.querySelector("body").classList.toggle("locked");
};

window.toggleGuideMenu = function() {
    document.querySelector(".guide-nav").classList.toggle("open");
}

if (!window.matchMedia("(min-width: 1024px)").matches) {
    console.log('MATCHED')
    window.toggleGuideMenu();
}
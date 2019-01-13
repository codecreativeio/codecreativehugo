window.toggleMenu = function() {
    document.querySelector(".menuToggle button").classList.toggle("is-active");
    document.querySelector(".fullNav").classList.toggle("open");
    document.querySelector("body").classList.toggle("locked");
};

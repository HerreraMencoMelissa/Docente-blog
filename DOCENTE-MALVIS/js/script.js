document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menuToggle");
    const navigation = document.querySelector(".navigation");
    const backTop = document.getElementById("backTop");

    /* NAVBAR AL HACER SCROLL */
    window.addEventListener("scroll", function () {
        if (window.scrollY > 70) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
        if (window.scrollY > 400) {
            backTop.classList.add("show");
        } else {
            backTop.classList.remove("show");
        }
    });

    /* MENÚ MÓVIL */
    menuToggle.addEventListener("click", function () {
        navigation.classList.toggle("open");
        const abierto = navigation.classList.contains("open");
        menuToggle.setAttribute("aria-expanded", abierto);
    });

    /* CERRAR MENÚ AL SELECCIONAR */
    navigation.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navigation.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    /* VOLVER ARRIBA */
    backTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
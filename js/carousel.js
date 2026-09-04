document.addEventListener("DOMContentLoaded", () => {

    const carousels = document.querySelectorAll("[data-carousel]");

    carousels.forEach((carousel) => {

        const slides = carousel.querySelectorAll(".carousel-slide");
        const prevButton = carousel.querySelector(".prev");
        const nextButton = carousel.querySelector(".next");
        const dotsContainer = carousel.querySelector(".carousel-dots");

        let currentSlide = 0;
        let interval = null;

        /*
        ==========================================
        UNA SOLA IMAGEN
        ==========================================
        */

        if (slides.length <= 1) {

            if (prevButton) {
                prevButton.style.display = "none";
            }

            if (nextButton) {
                nextButton.style.display = "none";
            }

            if (dotsContainer) {
                dotsContainer.style.display = "none";
            }

            if (slides[0]) {
                slides[0].classList.add("active");
            }

            return;
        }


        /*
        ==========================================
        CREAR INDICADORES
        ==========================================
        */

        slides.forEach((slide, index) => {

            const dot = document.createElement("button");

            dot.classList.add("carousel-dot");

            dot.setAttribute(
                "aria-label",
                `Ir a la imagen ${index + 1}`
            );

            if (index === 0) {
                dot.classList.add("active");
            }

            dot.addEventListener("click", () => {
                showSlide(index);
                restartAutoplay();
            });

            dotsContainer.appendChild(dot);

        });


        const dots = dotsContainer.querySelectorAll(".carousel-dot");


        /*
        ==========================================
        MOSTRAR SLIDE
        ==========================================
        */

        function showSlide(index) {

            if (index >= slides.length) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = slides.length - 1;
            } else {
                currentSlide = index;
            }


            slides.forEach((slide, i) => {

                slide.classList.toggle(
                    "active",
                    i === currentSlide
                );

            });


            dots.forEach((dot, i) => {

                dot.classList.toggle(
                    "active",
                    i === currentSlide
                );

            });

        }


        /*
        ==========================================
        SIGUIENTE
        ==========================================
        */

        function nextSlide() {

            showSlide(currentSlide + 1);

        }


        /*
        ==========================================
        ANTERIOR
        ==========================================
        */

        function previousSlide() {

            showSlide(currentSlide - 1);

        }


        /*
        ==========================================
        BOTONES
        ==========================================
        */

        if (nextButton) {

            nextButton.addEventListener("click", () => {

                nextSlide();
                restartAutoplay();

            });

        }


        if (prevButton) {

            prevButton.addEventListener("click", () => {

                previousSlide();
                restartAutoplay();

            });

        }


        /*
        ==========================================
        AUTOPLAY
        ==========================================
        */

        function startAutoplay() {

            interval = setInterval(() => {

                nextSlide();

            }, 5000);

        }


        function stopAutoplay() {

            clearInterval(interval);

        }


        function restartAutoplay() {

            stopAutoplay();

            startAutoplay();

        }


        /*
        ==========================================
        PAUSAR AL PASAR EL MOUSE
        ==========================================
        */

        carousel.addEventListener(
            "mouseenter",
            stopAutoplay
        );


        carousel.addEventListener(
            "mouseleave",
            startAutoplay
        );


        /*
        ==========================================
        INICIO
        ==========================================
        */

        showSlide(0);

        startAutoplay();

    });

});
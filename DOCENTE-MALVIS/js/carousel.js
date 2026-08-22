document.addEventListener("DOMContentLoaded", () => {
    const carousels = document.querySelectorAll("[data-carousel]");

    carousels.forEach((carousel) => {
        const slides = carousel.querySelectorAll(".carousel-slide");
        const prevButton = carousel.querySelector(".prev");
        const nextButton = carousel.querySelector(".next");
        const dotsContainer = carousel.querySelector(".carousel-dots");

        let currentSlide = 0;
        let autoPlay;

        /* CREAR INDICADORES */
        slides.forEach((slide, index) => {
            const dot = document.createElement("button");
            dot.classList.add("carousel-dot");
            if (index === 0) dot.classList.add("active");
            dot.addEventListener("click", () => {
                currentSlide = index;
                showSlide(currentSlide);
                restartAutoPlay();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll(".carousel-dot");

        function showSlide(index) {
            slides.forEach((slide) => slide.classList.remove("active"));
            dots.forEach((dot) => dot.classList.remove("active"));
            slides[index].classList.add("active");
            dots[index].classList.add("active");
        }

        function nextSlide() {
            currentSlide++;
            if (currentSlide >= slides.length) currentSlide = 0;
            showSlide(currentSlide);
        }

        function previousSlide() {
            currentSlide--;
            if (currentSlide < 0) currentSlide = slides.length - 1;
            showSlide(currentSlide);
        }

        nextButton.addEventListener("click", () => { nextSlide(); restartAutoPlay(); });
        prevButton.addEventListener("click", () => { previousSlide(); restartAutoPlay(); });

        function startAutoPlay() {
            autoPlay = setInterval(() => { nextSlide(); }, 5000);
        }

        function restartAutoPlay() {
            clearInterval(autoPlay);
            startAutoPlay();
        }

        carousel.addEventListener("mouseenter", () => { clearInterval(autoPlay); });
        carousel.addEventListener("mouseleave", () => { startAutoPlay(); });

        startAutoPlay();
    });
});
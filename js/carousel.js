document.addEventListener("DOMContentLoaded", () => {

    const carousels = document.querySelectorAll("[data-carousel]");

    carousels.forEach((carousel) => {

        const slides = carousel.querySelectorAll(".carousel-slide");
        const prevButton = carousel.querySelector(".prev");
        const nextButton = carousel.querySelector(".next");
        const dotsContainer = carousel.querySelector(".carousel-dots");

        let currentSlide = 0;
        let interval = null;

        // 🚩 Bandera: true si hay un video reproduciéndose
        let videoReproduciendo = false;

        /*
        ==========================================
        UNA SOLA IMAGEN
        ==========================================
        */

        if (slides.length <= 1) {

            if (prevButton) prevButton.style.display = "none";
            if (nextButton) nextButton.style.display = "none";
            if (dotsContainer) dotsContainer.style.display = "none";

            if (slides[0]) slides[0].classList.add("active");

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
            dot.setAttribute("aria-label", `Ir a la imagen ${index + 1}`);
            if (index === 0) dot.classList.add("active");

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
                slide.classList.toggle("active", i === currentSlide);
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle("active", i === currentSlide);
            });

            // ⏸️ Pausar TODOS los videos que no estén en el slide activo
            slides.forEach((slide, i) => {
                const video = slide.querySelector("video");
                if (video && i !== currentSlide && !video.paused) {
                    video.pause();
                    video.currentTime = 0; // opcional: reinicia el video
                }
            });

            // Si el slide activo NO tiene video, liberar la bandera
            const slideActivo = slides[currentSlide];
            const videoActivo = slideActivo ? slideActivo.querySelector("video") : null;
            if (!videoActivo) {
                videoReproduciendo = false;
            }
        }


        /*
        ==========================================
        SIGUIENTE / ANTERIOR
        ==========================================
        */

        function nextSlide() {
            if (videoReproduciendo) return;
            showSlide(currentSlide + 1);
        }

        function previousSlide() {
            if (videoReproduciendo) return;
            showSlide(currentSlide - 1);
        }


        /*
        ==========================================
        BOTONES (permiten navegar aunque haya video)
        ==========================================
        */

        if (nextButton) {
            nextButton.addEventListener("click", () => {
                // 🎯 Pausar el video si está sonando
                pausarVideoActivo();
                // Forzar avance aunque haya video
                showSlide(currentSlide + 1);
                restartAutoplay();
            });
        }

        if (prevButton) {
            prevButton.addEventListener("click", () => {
                pausarVideoActivo();
                showSlide(currentSlide - 1);
                restartAutoplay();
            });
        }


        /*
        ==========================================
        PAUSAR VIDEO ACTIVO (helper)
        ==========================================
        */

        function pausarVideoActivo() {
            const slideActivo = slides[currentSlide];
            const video = slideActivo ? slideActivo.querySelector("video") : null;
            if (video && !video.paused) {
                video.pause();
            }
            videoReproduciendo = false;
        }


        /*
        ==========================================
        AUTOPLAY
        ==========================================
        */

        function startAutoplay() {
            if (videoReproduciendo) return;

            stopAutoplay();

            interval = setInterval(() => {
                nextSlide();
            }, 5000);
        }

        function stopAutoplay() {
            clearInterval(interval);
            interval = null;
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

        carousel.addEventListener("mouseenter", () => {
            stopAutoplay();
        });

        carousel.addEventListener("mouseleave", () => {
            if (!videoReproduciendo) {
                startAutoplay();
            }
        });


        /*
        ==========================================
        🎬 CONTROL DE VIDEOS
        ==========================================
        */

        const videos = carousel.querySelectorAll("video");

        videos.forEach((video) => {

            video.addEventListener("play", () => {
                videoReproduciendo = true;
                stopAutoplay();
            });

            video.addEventListener("ended", () => {
                videoReproduciendo = false;
                video.currentTime = 0;
                startAutoplay();
            });

            video.addEventListener("pause", () => {
                // Solo reanudar si el video está en el slide activo
                const slideDelVideo = video.closest(".carousel-slide");
                if (slideDelVideo && slideDelVideo.classList.contains("active")) {
                    if (!video.ended) {
                        videoReproduciendo = false;
                        startAutoplay();
                    }
                }
            });
        });


        /*
        ==========================================
        👁️ INTERSECTION OBSERVER
        Pausa el video cuando el carrusel
        sale de la pantalla (scroll)
        ==========================================
        */

        const observer = new IntersectionObserver((entries) => {

            entries.forEach((entry) => {

                // Si el carrusel ya no está visible en pantalla
                if (!entry.isIntersecting) {
                    const videoActivo = slides[currentSlide]
                        ? slides[currentSlide].querySelector("video")
                        : null;

                    if (videoActivo && !videoActivo.paused) {
                        videoActivo.pause();
                        videoReproduciendo = false;
                    }

                    // Detener autoplay al salir de pantalla (opcional pero recomendado)
                    stopAutoplay();
                } else {
                    // Cuando vuelve a estar visible, reanudar autoplay
                    // (solo si no hay video reproduciéndose)
                    if (!videoReproduciendo) {
                        startAutoplay();
                    }
                }
            });

        }, {
            threshold: 0.3 // 30% del carrusel visible para considerar "en pantalla"
        });

        observer.observe(carousel);


        /*
        ==========================================
        INICIO
        ==========================================
        */

        showSlide(0);
        startAutoplay();

    });

});
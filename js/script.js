document.addEventListener('DOMContentLoaded', () => {
    console.log('Script.js carregado e DOM pronto!');

    // 1. Menu de Navegação Responsivo (Menu Hambúrguer)
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            menuToggle.classList.toggle('active');
            const isExpanded = navList.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 767) {
                    navList.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', false);
                }
            });
        });
    }

    // 2. Scroll Suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerElement = document.querySelector('.main-header');
                const headerOffset = headerElement ? headerElement.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Validação de Formulário de Contato
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let isValid = true;

            const displayError = (inputElement, errorMessage, errorSpanId) => {
                inputElement.classList.add('invalid');
                const errorSpan = document.getElementById(errorSpanId);
                if (errorSpan) {
                    errorSpan.textContent = errorMessage;
                    inputElement.setAttribute('aria-invalid', 'true');
                }
            };

            const clearError = (inputElement, errorSpanId) => {
                inputElement.classList.remove('invalid');
                const errorSpan = document.getElementById(errorSpanId);
                if (errorSpan) {
                    errorSpan.textContent = '';
                    inputElement.setAttribute('aria-invalid', 'false');
                }
            };

            // Validação Nome
            const nameInput = document.getElementById('name');
            if (nameInput && nameInput.value.trim() === '') {
                displayError(nameInput, 'Por favor, digite seu nome.', 'name-error');
                isValid = false;
            } else if (nameInput) {
                clearError(nameInput, 'name-error');
            }

            // Validação E-mail
            const emailInput = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput && emailInput.value.trim() === '') {
                displayError(emailInput, 'Por favor, digite seu e-mail.', 'email-error');
                isValid = false;
            } else if (emailInput && !emailPattern.test(emailInput.value)) {
                displayError(emailInput, 'Por favor, digite um e-mail válido.', 'email-error');
                isValid = false;
            } else if (emailInput) {
                clearError(emailInput, 'email-error');
            }

            // Validação Mensagem
            const messageInput = document.getElementById('message');
            if (messageInput && messageInput.value.trim() === '') {
                displayError(messageInput, 'Por favor, digite sua mensagem.', 'message-error');
                isValid = false;
            } else if (messageInput) {
                clearError(messageInput, 'message-error');
            }

            if (isValid) {
                alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
                contactForm.reset();
            }
        });
    }

    // 4. Highlight Link Ativo
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-list a');

    const highlightNavLink = () => {
        let current = '';
        const headerElement = document.querySelector('.main-header');
        const headerHeight = headerElement ? headerElement.offsetHeight : 0;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 30;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', highlightNavLink);

    // 5. Animação de Digitação
    const typingTextElement = document.getElementById('typing-effect-text');
    const textToType = "Promovendo saúde, bem-estar e qualidade de vida desde 1999.";
    let charIndex = 0;
    let typeEffectTimeout;

    function typeEffect() {
        if (!typingTextElement) return;
        typingTextElement.textContent = textToType.substring(0, charIndex);
        if (charIndex < textToType.length) {
            charIndex++;
            typeEffectTimeout = setTimeout(typeEffect, 70);
        }
    }

    // 6. Carrossel de Imagens (Configurado para 6 slides e 10 segundos)
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    let currentSlide = 0;
    const intervalTime = 10000; // Tempo de passagem alterado para 10 segundos
    let slideInterval;

    if (slides.length > 0) {
        function showSlide(index) {
            if (index >= slides.length) index = 0;
            if (index < 0) index = slides.length - 1;

            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;

            // Inicia animação de digitação apenas no primeiro slide
            if (index === 0 && typingTextElement) {
                charIndex = 0;
                typingTextElement.textContent = '';
                clearTimeout(typeEffectTimeout);
                typeEffect();
            } else if (typingTextElement) {
                clearTimeout(typeEffectTimeout);
            }
        }

        function nextSlide() { showSlide(currentSlide + 1); }
        function prevSlide() { showSlide(currentSlide - 1); }

        function startSlideShow() {
            stopSlideShow();
            slideInterval = setInterval(nextSlide, intervalTime);
        }

        function stopSlideShow() { clearInterval(slideInterval); }

        nextBtn?.addEventListener('click', () => { stopSlideShow(); nextSlide(); startSlideShow(); });
        prevBtn?.addEventListener('click', () => { stopSlideShow(); prevSlide(); startSlideShow(); });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => { stopSlideShow(); showSlide(index); startSlideShow(); });
        });

        showSlide(currentSlide);
        startSlideShow();
    }
});
document.addEventListener('DOMContentLoaded', () => {
    console.log('Script.js carregado e DOM pronto!'); // Confirma que o script está sendo executado

    // 1. Menu de Navegação Responsivo (Menu Hambúrguer)
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (menuToggle && navList) {
        console.log('Menu de navegação encontrado.');
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            menuToggle.classList.toggle('active');
            const isExpanded = navList.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            console.log('Menu toggle clicado. Menu ativo:', isExpanded);
        });

        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 767) {
                    navList.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', false);
                    console.log('Item do menu clicado em mobile, menu fechado.');
                }
            });
        });
    } else {
        console.warn("Elementos do menu de navegação (menu-toggle ou nav-list) não encontrados. Verifique o HTML.");
    }

    // 2. Scroll Suave para as Seções
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                console.log('Scroll suave para:', targetId);
            } else {
                console.warn('Elemento alvo para scroll suave não encontrado:', targetId);
            }
        });
    });

    // 3. Validação de Formulário de Contato
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        console.log('Formulário de contato encontrado.');
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

            const nameInput = document.getElementById('name');
            if (nameInput) {
                if (nameInput.value.trim() === '') {
                    displayError(nameInput, 'Por favor, digite seu nome.', 'name-error');
                    isValid = false;
                } else {
                    clearError(nameInput, 'name-error');
                }
            } else { console.warn('Campo "name" do formulário não encontrado.'); }


            const emailInput = document.getElementById('email');
            const emailPattern = /
^
[^\s@]+@[^\s@]+\.[^\s@]+
$
/;
            if (emailInput) {
                if (emailInput.value.trim() === '') {
                    displayError(emailInput, 'Por favor, digite seu e-mail.', 'email-error');
                    isValid = false;
                } else if (!emailPattern.test(emailInput.value)) {
                    displayError(emailInput, 'Por favor, digite um e-mail válido.', 'email-error');
                    isValid = false;
                } else {
                    clearError(emailInput, 'email-error');
                }
            } else { console.warn('Campo "email" do formulário não encontrado.'); }


            const messageInput = document.getElementById('message');
            if (messageInput) {
                if (messageInput.value.trim() === '') {
                    displayError(messageInput, 'Por favor, digite sua mensagem.', 'message-error');
                    isValid = false;
                } else {
                    clearError(messageInput, 'message-error');
                }
            } else { console.warn('Campo "message" do formulário não encontrado.'); }


            if (isValid) {
                alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
                contactForm.reset();
                console.log('Formulário enviado com sucesso (simulado).');
            } else {
                console.log('Validação do formulário falhou.');
            }
        });

        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => {
                if (input.classList.contains('invalid')) {
                    const errorSpanId = input.getAttribute('aria-describedby');
                    if (errorSpanId) {
                        clearError(input, errorSpanId);
                    }
                }
            });
        });
    } else {
        console.warn("Formulário de contato não encontrado. Verifique o HTML.");
    }

    // 4. Destacar link de navegação ativo ao rolar
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
    highlightNavLink();

    // 5. Animação de Digitação (Typing Effect)
    const typingTextElement = document.getElementById('typing-effect-text');
    const textToType = "Promovendo saúde, bem-estar e qualidade de vida desde 1999.";
    let charIndex = 0;
    let typingSpeed = 70;
    let typeEffectTimeout;

    function typeEffect() {
        if (!typingTextElement) {
            console.warn("Elemento #typing-effect-text não encontrado. Animação de digitação não iniciada.");
            return;
        }

        const currentText = textToType.substring(0, charIndex);
        typingTextElement.textContent = currentText;

        if (charIndex < textToType.length) {
            charIndex++;
            typeEffectTimeout = setTimeout(typeEffect, typingSpeed);
        } else {
            // Opcional: Se quiser que o cursor pisque no final, o CSS já está configurado
            // typingTextElement.classList.add('typed-finished');
        }
    }

    // 6. Carrossel de Imagens na Seção Hero
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000; // Tempo em ms para a troca automática (5 segundos)

    if (slides.length > 0) {
        console.log(`Carrossel encontrado com ${slides.length} slides.`);

        function showSlide(index) {
            if (index < 0 || index >= slides.length) {
                console.error('Índice de slide inválido:', index);
                return;
            }

            // Remove a classe 'active' de todos os slides e dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Adiciona a classe 'active' ao slide e dot atual
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            console.log('Mostrando slide:', index);

            // Reinicia a animação de digitação apenas para o primeiro slide
            if (index === 0 && typingTextElement) {
                charIndex = 0; // Reseta o índice do caractere
                typingTextElement.textContent = ''; // Limpa o texto
                clearTimeout(typeEffectTimeout); // Limpa qualquer timeout anterior
                typeEffect(); // Inicia a digitação novamente
                console.log('Animação de digitação reiniciada para o slide 0.');
            } else if (typingTextElement) {
                // Se não for o primeiro slide, garante que o texto de digitação esteja vazio
                typingTextElement.textContent = '';
                clearTimeout(typeEffectTimeout); // Garante que a digitação pare
            }
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        function startSlideShow() {
            pauseSlideShow(); // Garante que não haja múltiplos intervalos rodando
            slideInterval = setInterval(nextSlide, intervalTime);
            console.log('Slideshow automático iniciado.');
        }

        function pauseSlideShow() {
            clearInterval(slideInterval);
            console.log('Slideshow automático pausado.');
        }

        // Event Listeners para botões de navegação
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                pauseSlideShow();
                prevSlide();
                startSlideShow(); // Reinicia o slideshow após navegação manual
            });
            console.log('Botão "anterior" do carrossel encontrado.');
        } else { console.warn('Botão "anterior" do carrossel não encontrado.'); }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                pauseSlideShow();
                nextSlide();
                startSlideShow(); // Reinicia o slideshow após navegação manual
            });
            console.log('Botão "próximo" do carrossel encontrado.');
        } else { console.warn('Botão "próximo" do carrossel não encontrado.'); }

        // Event Listeners para indicadores (dots)
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    pauseSlideShow();
                    currentSlide = index;
                    showSlide(currentSlide);
                    startSlideShow(); // Reinicia o slideshow após navegação manual
                });
            });
            console.log(`${dots.length} indicadores de carrossel encontrados.`);
        } else { console.warn('Nenhum indicador de carrossel (dots) encontrado.'); }

        // Inicia o carrossel e o slideshow automático
        showSlide(currentSlide); // Mostra o primeiro slide ao carregar
        startSlideShow();
    } else {
        console.warn("Nenhum slide de carrossel encontrado. Carrossel não iniciado. Verifique o HTML.");
    }
});

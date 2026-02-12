document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu de Navegação Responsivo (Menu Hambúrguer)
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            menuToggle.classList.toggle('active');
            // Adiciona ou remove aria-expanded para acessibilidade
            const isExpanded = navList.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Fecha o menu ao clicar em um item (apenas em mobile)
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 767) { // Verifica se é mobile
                    navList.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', false);
                }
            });
        });
    }

    // 2. Scroll Suave para as Seções
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Ajusta o scroll para considerar o header fixo
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // -20px para um pequeno padding extra

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
            e.preventDefault(); // Impede o envio padrão do formulário
            let isValid = true;

            // Função auxiliar para exibir erro
            const displayError = (inputElement, errorMessage, errorSpanId) => {
                inputElement.classList.add('invalid');
                const errorSpan = document.getElementById(errorSpanId);
                if (errorSpan) {
                    errorSpan.textContent = errorMessage;
                    inputElement.setAttribute('aria-invalid', 'true');
                }
            };

            // Função auxiliar para limpar erro
            const clearError = (inputElement, errorSpanId) => {
                inputElement.classList.remove('invalid');
                const errorSpan = document.getElementById(errorSpanId);
                if (errorSpan) {
                    errorSpan.textContent = '';
                    inputElement.setAttribute('aria-invalid', 'false');
                }
            };

            // Validação do campo Nome
            const nameInput = document.getElementById('name');
            if (nameInput.value.trim() === '') {
                displayError(nameInput, 'Por favor, digite seu nome.', 'name-error');
                isValid = false;
            } else {
                clearError(nameInput, 'name-error');
            }

            // Validação do campo E-mail
            const emailInput = document.getElementById('email');
            const emailPattern = /
^
[^\s@]+@[^\s@]+\.[^\s@]+
$
/;
            if (emailInput.value.trim() === '') {
                displayError(emailInput, 'Por favor, digite seu e-mail.', 'email-error');
                isValid = false;
            } else if (!emailPattern.test(emailInput.value)) {
                displayError(emailInput, 'Por favor, digite um e-mail válido.', 'email-error');
                isValid = false;
            } else {
                clearError(emailInput, 'email-error');
            }

            // Validação do campo Mensagem
            const messageInput = document.getElementById('message');
            if (messageInput.value.trim() === '') {
                displayError(messageInput, 'Por favor, digite sua mensagem.', 'message-error');
                isValid = false;
            } else {
                clearError(messageInput, 'message-error');
            }

            if (isValid) {
                // Se o formulário for válido, você pode enviar os dados
                // Para este projeto, vamos apenas simular um envio
                alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
                contactForm.reset(); // Limpa o formulário
                // Em um projeto real, você faria uma requisição AJAX aqui (ex: fetch API)
            }
        });

        // Remover classes de erro ao digitar
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => {
                if (input.classList.contains('invalid')) {
                    // Assumindo que o span de erro é o próximo irmão com ID específico
                    const errorSpanId = input.getAttribute('aria-describedby');
                    if (errorSpanId) {
                        clearError(input, errorSpanId);
                    }
                }
            });
        });
    }

    // 4. Destacar link de navegação ativo ao rolar
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-list a');

    const highlightNavLink = () => {
        let current = '';
        const headerHeight = document.querySelector('.main-header').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 30; // Ajuste para o header fixo e um pequeno offset
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
    highlightNavLink(); // Chama ao carregar para definir a seção inicial

    // 5. Animação de Digitação (Typing Effect)
    const typingTextElement = document.getElementById('typing-effect-text');
    const textToType = "Promovendo saúde, bem-estar e qualidade de vida desde 1999.";
    let charIndex = 0;
    let typingSpeed = 70; // Velocidade de digitação (ms por caractere)

    function typeEffect() {
        if (!typingTextElement) return; // Garante que o elemento existe

        const currentText = textToType.substring(0, charIndex);
        typingTextElement.textContent = currentText;

        if (charIndex < textToType.length) {
            charIndex++;
            setTimeout(typeEffect, typingSpeed);
        } else {
            // Opcional: Adicionar um cursor piscando no final
            // typingTextElement.classList.add('typed-finished');
        }
    }

    // Inicia o efeito de digitação quando a página carrega
    if (typingTextElement) {
        typeEffect();
    }
});

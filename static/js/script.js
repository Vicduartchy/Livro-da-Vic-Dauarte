/**
 * Vic Duarte Website - Script Principal
 * Gerencia interações e animações do site
 */

// Espera o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. NAVBAR SCROLL EFFECT ==========
    /**
     * Adiciona classe 'scrolled' ao navbar quando o usuário rola a página
     * Menu nunca desaparece (correção implementada)
     */
    const handleNavbarScroll = () => {
        const navbar = document.querySelector('.navbar');
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    // Adiciona o evento de scroll com performance
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    
    // ========== 2. SMOOTH SCROLL COM OFFSET ==========
    /**
     * Implementa scroll suave para links âncora com offset de 30px
     * Fecha o menu mobile em dispositivos móveis
     */
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navbarHeight - 30;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Fecha menu mobile se estiver aberto
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            });
        });
    };
    
    initSmoothScroll();
    
    // ========== 3. ACTIVE NAV LINK ON SCROLL ==========
    /**
     * Adiciona classe 'active' ao link de navegação correspondente à seção visível
     */
    const initActiveNavLink = () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        const handleScroll = () => {
            let current = '';
            const scrollPosition = window.pageYOffset + 150; // Offset para detecção
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        };
        
        // Adiciona o evento com throttle para melhor performance
        let ticking = false;
        const updateOnScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', updateOnScroll, { passive: true });
        // Executa uma vez no carregamento
        handleScroll();
    };
    
    initActiveNavLink();
    
    // ========== 4. ANIMATE ELEMENTS ON SCROLL ==========
    /**
     * Anima elementos quando entram na viewport usando Intersection Observer
     */
    const initScrollAnimations = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Opcional: desconectar após a animação para melhor performance
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Elementos para observar
        const animatedElements = document.querySelectorAll(
            '.card, .benefit-item, .highlight-card, .theme-item, .section-icon'
        );
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    };
    
    initScrollAnimations();
    
    // ========== 5. IMAGE LOADING ANIMATION ==========
    /**
     * Adiciona classe 'loaded' às imagens quando completamente carregadas
     */
    const initImageLoading = () => {
        document.querySelectorAll('img').forEach(img => {
            // Se a imagem já estiver carregada
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
                
                // Tratamento de erro
                img.addEventListener('error', () => {
                    console.error(`Erro ao carregar imagem: ${img.src}`);
                    img.classList.add('error');
                });
            }
        });
    };
    
    initImageLoading();
    
    // ========== 6. SCROLL INDICATOR CLICK ==========
    /**
     * Adiciona funcionalidade ao indicador de scroll
     */
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.getElementById('sinopse').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    // ========== 7. BACK TO TOP BUTTON ==========
    /**
     * Implementa botão de voltar ao topo que aparece ao rolar para baixo
     */
    const initBackToTop = () => {
        const backToTopButton = document.getElementById('backToTop');
        
        const handleScroll = () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        };
        
        // Mostra/esconde botão ao rolar
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Ação do clique
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };
    
    initBackToTop();
    
    // ========== 8. PAGE LOAD ANIMATION ==========
    /**
     * Adiciona uma classe ao body quando a página é completamente carregada
     */
    window.addEventListener('load', () => {
        document.body.classList.add('page-loaded');
    });
    
    // ========== 9. ACCESSIBILITY ENHANCEMENTS ==========
    /**
     * Melhora a acessibilidade do site
     */
    const initAccessibility = () => {
        // Foco visível melhorado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
        
        // Skip link functionality
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const mainContent = document.getElementById('main-content');
                if (mainContent) {
                    mainContent.setAttribute('tabindex', '-1');
                    mainContent.focus();
                    mainContent.removeAttribute('tabindex');
                }
            });
        }
    };
    
    initAccessibility();
    
    // ========== 10. PERFORMANCE MONITORING (Opcional) ==========
    /**
     * Monitora a performance do carregamento da página
     */
    if ('performance' in window && 'PerformanceObserver' in window) {
        const perfObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'largest-contentful-paint') {
                    console.log(`LCP: ${entry.startTime}ms`);
                }
                if (entry.entryType === 'first-input') {
                    console.log(`FID: ${entry.processingStart - entry.startTime}ms`);
                }
            }
        });
        
        try {
            perfObserver.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
        } catch (e) {
            console.log('Performance Observer não suportado');
        }
    }
    
    // ========== 11. UTILITIES ==========
    /**
     * Funções utilitárias para uso futuro
     */
    const utils = {
        // Debounce para melhor performance
        debounce: (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        // Throttle para limitar execuções
        throttle: (func, limit) => {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }
    };
    
    // Expondo utilidades globalmente se necessário
    window.SiteUtils = utils;
    
    // Log de inicialização
    console.log('🚀 Site da Vic Duarte inicializado com sucesso!');
});

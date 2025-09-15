// Cyberpunk Party Invitation Interactive JavaScript

class CyberpunkInvitation {
    constructor() {
        this.init();
    }

    init() {
        this.createParticleEffects();
        this.createMatrixRain();
        this.setupAnimationObserver();
        this.addGlitchEffects();
        this.addInteractiveEffects();
    }

    createParticleEffects() {
        const container = document.getElementById('particles');
        if (!container) return;

        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random starting position
            particle.style.left = Math.random() * 100 + '%';
            
            // Random color variations
            const colors = ['#00FFFF', '#FF0040', '#8B00FF', '#00FF41'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            // Random size variations
            const size = Math.random() * 3 + 1;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random animation duration
            particle.style.animationDuration = (Math.random() * 4 + 3) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            
            container.appendChild(particle);

            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 8000);
        };

        // Create particles periodically
        setInterval(createParticle, 200);
        
        // Create initial particles
        for (let i = 0; i < 10; i++) {
            setTimeout(createParticle, i * 100);
        }
    }

    createMatrixRain() {
        const container = document.getElementById('matrixRain');
        if (!container) return;

        const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const columns = Math.floor(window.innerWidth / 20);
        
        for (let i = 0; i < columns; i++) {
            this.createMatrixColumn(container, characters, i * 20);
        }
    }

    createMatrixColumn(container, characters, leftPosition) {
        const column = document.createElement('div');
        column.style.position = 'absolute';
        column.style.left = leftPosition + 'px';
        column.style.top = '0';
        column.style.color = '#00FF41';
        column.style.fontSize = '14px';
        column.style.fontFamily = 'monospace';
        column.style.opacity = '0.3';
        column.style.textShadow = '0 0 5px #00FF41';
        
        container.appendChild(column);

        const animateColumn = () => {
            const columnHeight = Math.random() * window.innerHeight;
            const speed = Math.random() * 2000 + 1000;
            
            column.innerHTML = '';
            column.style.top = '-100px';
            
            const charCount = Math.floor(columnHeight / 20);
            for (let j = 0; j < charCount; j++) {
                const char = document.createElement('div');
                char.textContent = characters[Math.floor(Math.random() * characters.length)];
                char.style.opacity = Math.random() > 0.7 ? '1' : '0.1';
                column.appendChild(char);
            }
            
            column.style.transition = `top ${speed}ms linear`;
            column.style.top = window.innerHeight + 'px';
            
            setTimeout(() => {
                setTimeout(animateColumn, Math.random() * 3000);
            }, speed);
        };

        // Start animation with random delay
        setTimeout(animateColumn, Math.random() * 5000);
    }

    setupAnimationObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const delay = element.style.animationDelay || '0s';
                    
                    if (element.classList.contains('animate-fade-in')) {
                        element.style.animationDelay = delay;
                    } else if (element.classList.contains('animate-slide-up')) {
                        element.style.animationDelay = delay;
                    } else if (element.classList.contains('animate-scale-in')) {
                        element.style.animationDelay = delay;
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        // Observe animated elements
        const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-scale-in');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    addInteractiveEffects() {
        // Add glitch effect to cyber button on hover
        const cyberBtn = document.getElementById('confirmBtn');
        if (cyberBtn) {
            cyberBtn.addEventListener('mouseenter', this.addGlitchAnimation);
            cyberBtn.addEventListener('mouseleave', this.removeGlitchAnimation);
        }

        // Add interactive glow to detail cards
        const detailCards = document.querySelectorAll('.detail-card');
        detailCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                e.target.style.transform = 'translateY(-10px) scale(1.02)';
                e.target.style.boxShadow = `
                    inset 0 0 20px rgba(0, 255, 255, 0.3),
                    0 0 25px rgba(0, 255, 255, 0.4),
                    0 0 50px rgba(0, 255, 255, 0.3)
                `;
                e.target.style.borderColor = '#00FFFF';
            });
            
            card.addEventListener('mouseleave', (e) => {
                e.target.style.transform = '';
                e.target.style.boxShadow = '';
                e.target.style.borderColor = '';
            });
        });
    }

    addGlitchAnimation(e) {
        const btn = e.target;
        btn.style.animation = 'glitch-btn 0.3s ease-in-out infinite';
    }

    removeGlitchAnimation(e) {
        const btn = e.target;
        btn.style.animation = '';
    }

    addGlitchEffects() {
        // Add random glitch effects to title
        const heroTitle = document.querySelector('.hero-title');
        
        if (heroTitle) {
            setInterval(() => {
                if (Math.random() > 0.95) {
                    heroTitle.style.textShadow = `
                        2px 0 #FF0040,
                        -2px 0 #00FFFF,
                        0 0 20px #FFFFFF
                    `;
                    setTimeout(() => {
                        heroTitle.style.textShadow = `
                            0 0 5px #FFFFFF,
                            0 0 10px #FFFFFF,
                            0 0 15px #FFFFFF,
                            0 0 20px #00FFFF,
                            0 0 35px #00FFFF,
                            0 0 40px #00FFFF
                        `;
                    }, 100);
                }
            }, 200);
        }
    }

    showSuccessAnimation() {
        // Create temporary success particles
        const container = document.getElementById('particles');
        if (!container) return;

        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = '50%';
                particle.style.width = '4px';
                particle.style.height = '4px';
                particle.style.background = '#00FF41';
                particle.style.borderRadius = '50%';
                particle.style.boxShadow = '0 0 10px #00FF41';
                particle.style.animation = 'success-burst 1s ease-out forwards';
                particle.style.zIndex = '100';
                
                container.appendChild(particle);

                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 1000);
            }, i * 50);
        }
    }
}

// Global function for confirmation button - Fixed implementation
function confirmPresence() {
    console.log('confirmPresence called'); // Debug log
    
    const buttonContainer = document.getElementById('buttonContainer');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const confirmBtn = document.getElementById('confirmBtn');
    
    console.log('Elements found:', { buttonContainer, confirmationMessage, confirmBtn }); // Debug log
    
    if (buttonContainer && confirmationMessage && confirmBtn) {
        // Disable button to prevent multiple clicks
        confirmBtn.disabled = true;
        
        // Add exit animation to button container
        buttonContainer.style.transform = 'scale(0.8) rotateX(90deg)';
        buttonContainer.style.opacity = '0';
        buttonContainer.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        // Add screen flash effect
        document.body.style.background = '#00FF41';
        setTimeout(() => {
            document.body.style.background = '';
        }, 150);
        
        setTimeout(() => {
            // Hide button container
            buttonContainer.classList.add('hidden');
            
            // Show confirmation message
            confirmationMessage.classList.remove('hidden');
            confirmationMessage.classList.add('show');
            
            // Show success animation
            if (window.cyberpunkApp) {
                window.cyberpunkApp.showSuccessAnimation();
            }
            
            console.log('Confirmation completed successfully'); // Debug log
            
        }, 500);
    } else {
        console.error('Required elements not found:', { 
            buttonContainer: !!buttonContainer, 
            confirmationMessage: !!confirmationMessage,
            confirmBtn: !!confirmBtn
        });
    }
}

// Add CSS keyframes via JavaScript for dynamic animations
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes glitch-btn {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
    }
    
    @keyframes success-burst {
        0% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg) translateY(-100px);
            opacity: 0;
        }
    }
    
    .detail-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    @keyframes screen-shake {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        10% { transform: translate(-1px, -2px) rotate(-1deg); }
        20% { transform: translate(-3px, 0px) rotate(1deg); }
        30% { transform: translate(3px, 2px) rotate(0deg); }
        40% { transform: translate(1px, -1px) rotate(1deg); }
        50% { transform: translate(-1px, 2px) rotate(-1deg); }
        60% { transform: translate(-3px, 1px) rotate(0deg); }
        70% { transform: translate(3px, 1px) rotate(-1deg); }
        80% { transform: translate(-1px, -1px) rotate(1deg); }
        90% { transform: translate(1px, 2px) rotate(0deg); }
    }
`;

document.head.appendChild(dynamicStyles);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing Cyberpunk App');
    window.cyberpunkApp = new CyberpunkInvitation();
});

// Also initialize if script loads after DOM is ready
if (document.readyState !== 'loading') {
    console.log('Document already loaded - Initializing Cyberpunk App');
    window.cyberpunkApp = new CyberpunkInvitation();
}

// Handle window resize for responsive matrix effect
window.addEventListener('resize', () => {
    const matrixContainer = document.getElementById('matrixRain');
    if (matrixContainer && window.cyberpunkApp) {
        matrixContainer.innerHTML = '';
        setTimeout(() => {
            window.cyberpunkApp.createMatrixRain();
        }, 100);
    }
});

// Add keyboard shortcuts for easter eggs
document.addEventListener('keydown', (e) => {
    // Konami code or special effects
    if (e.key === 'Enter' && e.ctrlKey) {
        // Add screen shake effect
        document.body.style.animation = 'screen-shake 0.5s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);
    }
});
// Animation Functions using GSAP and Canvas Confetti

// Check if GSAP is available
const hasGSAP = typeof gsap !== 'undefined';
const hasConfetti = typeof confetti !== 'undefined';

// Animate Game Start
function animateGameStart() {
    if (!hasGSAP) return;
    
    const masterBoard = document.getElementById('masterBoard');
    const masterCells = document.querySelectorAll('.master-number');
    
    // Animate master board cells in sequence
    gsap.fromTo(masterCells,
        { scale: 0, rotation: 360, opacity: 0 },
        {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.5,
            stagger: {
                amount: 1.5,
                from: "random"
            },
            ease: "back.out(1.7)"
        }
    );
    
    // Flash the status
    const gameStatus = document.getElementById('gameStatus');
    gsap.fromTo(gameStatus,
        { scale: 0.5, opacity: 0 },
        {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)"
        }
    );
}

// Animate Number Call with enhanced effects
function animateNumberCall(number) {
    const ball = document.getElementById('currentCallBall');
    const ballNumber = document.getElementById('ballNumber');
    const ballLetter = document.getElementById('ballLetter');
    const masterCell = document.querySelector(`.master-number[data-number="${number}"]`);
    
    if (hasGSAP) {
        // Ball dramatic entrance
        gsap.timeline()
            // Ball explodes in
            .fromTo(ball, 
                { scale: 0, rotation: -720, y: -200 },
                { 
                    scale: 1.3, 
                    rotation: 0,
                    y: 0,
                    duration: 0.8,
                    ease: "back.out(2)"
                }
            )
            // Bounce settle
            .to(ball, {
                scale: 1,
                duration: 0.5,
                ease: "elastic.out(1, 0.4)"
            })
            // Add rotation wiggle
            .to(ball, {
                rotation: "+=15",
                duration: 0.1,
                yoyo: true,
                repeat: 3
            }, "-=0.3");
        
        // Number and letter pop-in with stagger
        gsap.timeline()
            .fromTo([ballLetter, ballNumber],
                { scale: 0, rotation: 180, opacity: 0 },
                { 
                    scale: 1, 
                    rotation: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "back.out(3)",
                    stagger: 0.15
                },
                "-=0.6"
            )
            // Pulse effect
            .to([ballLetter, ballNumber], {
                scale: 1.1,
                duration: 0.2,
                yoyo: true,
                repeat: 1
            });
        
        // Add glow effect
        gsap.to(ball, {
            boxShadow: '0 0 60px rgba(30, 155, 214, 0.9)',
            duration: 0.5,
            yoyo: true,
            repeat: 1
        });
        
        // Master board number explosion effect
        if (masterCell) {
            gsap.timeline()
                .to(masterCell, {
                    scale: 2,
                    zIndex: 100,
                    duration: 0.3,
                    ease: "power2.out"
                })
                .to(masterCell, {
                    scale: 1,
                    duration: 0.4,
                    ease: "elastic.out(1, 0.5)"
                })
                // Glow pulse
                .to(masterCell, {
                    textShadow: '0 0 20px rgba(255, 255, 255, 1), 0 0 40px rgba(30, 155, 214, 0.8)',
                    duration: 0.3,
                    repeat: 3,
                    yoyo: true
                });
        }
        
        // Animate history balls with enhanced entrance
        animateHistoryBalls();
        
        // Create particle effect around the ball
        createParticleEffect(ball);
        
    } else {
        // CSS Fallback
        ball.classList.add('pulse');
        setTimeout(() => ball.classList.remove('pulse'), 500);
        
        if (masterCell) {
            masterCell.classList.add('flash');
            setTimeout(() => masterCell.classList.remove('flash'), 900);
        }
    }
}

// Create particle effect around ball
function createParticleEffect(ball) {
    if (!hasGSAP) return;
    
    const rect = ball.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create sparkle particles
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.borderRadius = '50%';
        particle.style.background = '#1e9bd6';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 12;
        const distance = 100 + Math.random() * 50;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        gsap.to(particle, {
            x: x,
            y: y,
            opacity: 0,
            scale: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => particle.remove()
        });
    }
}

// Animate History Balls with enhanced effects
function animateHistoryBalls() {
    if (!hasGSAP) return;
    
    const historyBalls = document.querySelectorAll('.history-ball');
    
    historyBalls.forEach((ball, index) => {
        if (index === 0) {
            // First ball (newest) gets special animation
            gsap.fromTo(ball,
                { 
                    scale: 0,
                    x: -100,
                    rotation: -360,
                    opacity: 0
                },
                { 
                    scale: 1,
                    x: 0,
                    rotation: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "back.out(2)"
                }
            );
            
            // Add bounce
            gsap.to(ball, {
                y: -10,
                duration: 0.3,
                yoyo: true,
                repeat: 1,
                delay: 0.6
            });
        } else {
            // Other balls slide over
            gsap.fromTo(ball,
                { x: -20, opacity: 0 },
                { 
                    x: 0,
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                }
            );
        }
    });
}

// Celebrate End Game with Epic Confetti
async function celebrateEndGame() {
    if (!hasConfetti) {
        alert('🎉 Game Ended! Resetting...');
        return;
    }
    
    // Freeze the ball with a victory animation
    const ball = document.getElementById('currentCallBall');
    if (hasGSAP) {
        gsap.to(ball, {
            scale: 1.3,
            rotation: 720,
            duration: 1,
            ease: "power2.inOut"
        });
    }
    
    const duration = 3500;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };
    
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    // Continuous confetti burst
    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        
        if (timeLeft <= 0) {
            return clearInterval(interval);
        }
        
        const particleCount = 50 * (timeLeft / duration);
        
        // Left side confetti
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#1e9bd6', '#4a90e2', '#e74c3c', '#f1c40f', '#fff']
        });
        
        // Right side confetti
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#1e9bd6', '#4a90e2', '#e74c3c', '#f1c40f', '#fff']
        });
    }, 250);
    
    // Big confetti explosions
    setTimeout(() => {
        confetti({
            particleCount: 150,
            spread: 120,
            origin: { y: 0.6 },
            colors: ['#1e9bd6', '#4a90e2', '#e74c3c', '#f1c40f', '#fff']
        });
    }, 500);
    
    setTimeout(() => {
        confetti({
            particleCount: 150,
            spread: 120,
            origin: { y: 0.6 },
            colors: ['#1e9bd6', '#4a90e2', '#e74c3c', '#f1c40f', '#fff']
        });
    }, 1500);
    
    setTimeout(() => {
        confetti({
            particleCount: 200,
            spread: 160,
            origin: { y: 0.5 },
            colors: ['#1e9bd6', '#4a90e2', '#e74c3c', '#f1c40f', '#fff']
        });
    }, 2500);
    
    // Firework effect
    setTimeout(() => {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 }
        };
        
        function fire(particleRatio, opts) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }
        
        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        
        fire(0.2, {
            spread: 60,
        });
        
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });
        
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });
        
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    }, 3000);
    
    // Animate game status
    if (hasGSAP) {
        const gameStatus = document.getElementById('gameStatus');
        gsap.to(gameStatus, {
            scale: 1.5,
            color: '#4caf50',
            duration: 0.5,
            yoyo: true,
            repeat: 5
        });
    }
}

// Enhanced CSS animations for fallback
const style = document.createElement('style');
style.textContent = `
    @keyframes superPulse {
        0%, 100% { transform: scale(1); }
        25% { transform: scale(1.2) rotate(5deg); }
        50% { transform: scale(1.1) rotate(-5deg); }
        75% { transform: scale(1.15) rotate(3deg); }
    }
    
    @keyframes superFlash {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.5); }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
    }
    
    .current-call-ball {
        animation: float 3s ease-in-out infinite;
    }
`;
document.head.appendChild(style);

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    if (hasGSAP) {
        console.log('✨ GSAP loaded - Enhanced animations enabled');
        
        // Initial page load animation
        gsap.from('.sidebar', {
            x: -300,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
        
        gsap.from('.main-content', {
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: "power2.out"
        });
        
        gsap.from('.logo-header', {
            scale: 0,
            rotation: -180,
            duration: 1,
            delay: 0.5,
            ease: "back.out(1.7)"
        });
        
        gsap.from('.counters', {
            y: -50,
            opacity: 0,
            duration: 0.8,
            delay: 0.7,
            ease: "power2.out"
        });
        
        gsap.from('.game-stats', {
            y: -50,
            opacity: 0,
            duration: 0.8,
            delay: 0.9,
            ease: "power2.out"
        });
        
        gsap.from('.controls .btn', {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            delay: 1.1,
            stagger: 0.1,
            ease: "back.out(2)"
        });
        
    } else {
        console.log('⚠️ GSAP not loaded - Using CSS fallback animations');
    }
    
    if (hasConfetti) {
        console.log('🎉 Confetti loaded - Celebration effects enabled');
    } else {
        console.log('⚠️ Confetti not loaded - Basic end game message will show');
    }
});

// Export functions for game.js
window.animateNumberCall = animateNumberCall;
window.animateGameStart = animateGameStart;
window.celebrateEndGame = celebrateEndGame;

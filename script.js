window.addEventListener('beforeunload', function () {
  window.scrollTo(0, 0);
});
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll-triggered Reveal Animation (fast, no delay)
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 80;
    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);

// Theme auto-detection and switching
function applyTheme() {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (isDark) {
    document.body.classList.remove('light-mode');
  } else {
    document.body.classList.add('light-mode');
  }
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);

// Navigation Bar Color Change on Scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Typing animation for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}
// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero h1');
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 150);
});
// Add loading animation
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 2000);
    }
});

// Smooth, linear loading screen with percentage only
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const percentText = document.querySelector('.loader-percent');
    let percent = 0;
    let startTime = null;
    const duration = 1200; // ms for full loading
    function animateLoading(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        percent = Math.min(100, Math.round((elapsed / duration) * 100));
        percentText.textContent = percent + '%';
        if (percent < 100) {
            requestAnimationFrame(animateLoading);
        } else {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 300);
        }
    }
    requestAnimationFrame(animateLoading);
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Enhanced project cards interaction (touch + mouse)
document.querySelectorAll('.project-card').forEach(card => {
    // Mouse events
    card.addEventListener('mouseenter', function() {
        if (!('ontouchstart' in window)) { // Only on non-touch devices
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(88, 166, 255, 0.2)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (!('ontouchstart' in window)) {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        }
    });
    
    // Touch events for mobile
    card.addEventListener('touchstart', function() {
        this.style.transform = 'translateY(-4px) scale(1.01)';
        this.style.boxShadow = '0 8px 20px rgba(88, 166, 255, 0.15)';
    });
    
    card.addEventListener('touchend', function() {
        setTimeout(() => {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        }, 150);
    });
});

// Skills progress animation
function animateSkills() {
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        setTimeout(() => {
            category.style.opacity = '1';
            category.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Smooth reveal animation for tech icons
document.querySelectorAll('.tech-icons i').forEach((icon, index) => {
    icon.style.opacity = '0';
    icon.style.transform = 'translateY(20px)';
    icon.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
        icon.style.opacity = '1';
        icon.style.transform = 'translateY(0)';
    }, 1000 + index * 200);
});

// Smooth scroll behavior enhancement
document.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
        // Optimize scroll performance
    });
});

// Enhanced Hamburger menu logic with animations
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const closeMobileMenu = document.getElementById('close-mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', mobileMenu.classList.contains('active'));
    
    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  // Close menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
  // Close menu when clicking the close icon
  if (closeMobileMenu) {
    closeMobileMenu.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  }
  // Close menu when clicking outside or pressing escape
  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && e.target !== hamburger) {
      mobileMenu.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

// --- Loading Screen Percentage and Main DOMContentLoaded Logic ---
document.addEventListener('DOMContentLoaded', function() {
  // Declare loadingScreen ONCE here
  const loadingScreen = document.getElementById('loading-screen');
  const percentText = document.querySelector('.loader-percent');

  // --- Loading Screen Percentage Animation ---
  if (loadingScreen && percentText) {
    let percent = 0;
    function updatePercent() {
      percentText.textContent = `Loading ${percent}%`;
    }
    function animateLoading() {
      if (percent < 100) {
        percent += Math.floor(Math.random() * 7) + 1;
        if (percent > 100) percent = 100;
        updatePercent();
        setTimeout(animateLoading, 20 + Math.random() * 40);
      } else {
        setTimeout(() => {
          loadingScreen.style.opacity = '0';
          setTimeout(() => {
            loadingScreen.style.display = 'none';
            // If page is not scrollable, reveal hero content automatically
            if (document.body.scrollHeight <= window.innerHeight + 2) {
              // checkHeroReveal(true); // This line is removed
            }
          }, 400);
        }, 300);
      }
    }
    updatePercent();
    animateLoading();
  } else if (loadingScreen) {
    // Fallback: no percent, just fade out after a delay
    setTimeout(() => {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        if (document.body.scrollHeight <= window.innerHeight + 2) {
          // checkHeroReveal(true); // This line is removed
        }
      }, 500);
    }, 1200);
  }

  // --- 3D Skill Group Interactivity ---
  const skillGroups = document.querySelectorAll('.skill-group');
  if (skillGroups.length) {
    skillGroups.forEach(group => {
      group.addEventListener('click', function() {
        skillGroups.forEach(g => g.classList.remove('active'));
        this.classList.add('active');
        const carousel = this.querySelector('.skills-carousel');
        if (carousel) carousel.scrollTo({ left: 0, behavior: 'smooth' });
      });
    });
  }

  // --- 3D Coverflow Skills Section (Circular + Auto-Rotate + Responsive) ---
  const coverflow = document.querySelector('.skills-coverflow');
  const skillCards = coverflow ? Array.from(coverflow.querySelectorAll('.skill-card')) : [];
  let coverflowIndex = Math.floor(skillCards.length / 2);
  let autoRotate = true;
  let autoRotateInterval;

  function mod(n, m) { return ((n % m) + m) % m; }

  function getResponsiveValues() {
    const width = window.innerWidth;
    if (width < 600) {
      return { angle: 32, x: 70 };
    } else if (width < 900) {
      return { angle: 28, x: 110 };
    } else {
      return { angle: 30, x: 160 };
    }
  }

  function updateCoverflow() {
    const total = skillCards.length;
    const { angle, x } = getResponsiveValues();
    skillCards.forEach((card, i) => {
      let offset = mod(i - coverflowIndex, total);
      if (offset > total / 2) offset -= total;
      const rot = offset * angle;
      const scale = offset === 0 ? 1.25 : 1;
      const z = offset === 0 ? 3 : 1;
      card.classList.toggle('active', offset === 0);
      card.style.transform = `translate(-50%, -50%) rotateY(${rot}deg) translateX(${offset * x}px) scale(${scale})`;
      card.style.zIndex = z;
      card.style.opacity = Math.abs(offset) > 3 ? 0 : (offset === 0 ? 1 : 0.7);
      card.style.pointerEvents = Math.abs(offset) > 3 ? 'none' : 'auto';
    });
  }

  function goToCoverflow(idx) {
    coverflowIndex = mod(idx, skillCards.length);
    updateCoverflow();
  }

  // Auto-rotate logic
  function startAutoRotate() {
    if (autoRotateInterval) clearInterval(autoRotateInterval);
    autoRotateInterval = setInterval(() => {
      if (autoRotate) goToCoverflow(coverflowIndex + 1);
    }, 2500);
  }
  function pauseAutoRotate() {
    autoRotate = false;
    if (autoRotateInterval) clearInterval(autoRotateInterval);
  }
  function resumeAutoRotate() {
    autoRotate = true;
    startAutoRotate();
  }

  // Mouse/Touch/Scroll events
  let startX = null;
  let dragging = false;

  if (coverflow) {
    coverflow.addEventListener('mousedown', (e) => {
      dragging = true;
      startX = e.clientX;
      pauseAutoRotate();
    });
    window.addEventListener('mousemove', (e) => {
      if (!dragging) return;
      if (e.clientX - startX > 40) {
        goToCoverflow(coverflowIndex - 1);
        dragging = false;
      } else if (e.clientX - startX < -40) {
        goToCoverflow(coverflowIndex + 1);
        dragging = false;
      }
    });
    window.addEventListener('mouseup', () => { dragging = false; resumeAutoRotate(); });

    coverflow.addEventListener('touchstart', (e) => {
      dragging = true;
      startX = e.touches[0].clientX;
      pauseAutoRotate();
    });
    window.addEventListener('touchmove', (e) => {
      if (!dragging) return;
      const x = e.touches[0].clientX;
      if (x - startX > 40) {
        goToCoverflow(coverflowIndex - 1);
        dragging = false;
      } else if (x - startX < -40) {
        goToCoverflow(coverflowIndex + 1);
        dragging = false;
      }
    });
    window.addEventListener('touchend', () => { dragging = false; resumeAutoRotate(); });

    coverflow.addEventListener('wheel', (e) => {
      pauseAutoRotate();
      if (e.deltaY > 0 || e.deltaX > 0) goToCoverflow(coverflowIndex + 1);
      else if (e.deltaY < 0 || e.deltaX < 0) goToCoverflow(coverflowIndex - 1);
      setTimeout(resumeAutoRotate, 1000);
    });

    skillCards.forEach((card, i) => {
      card.addEventListener('click', () => { goToCoverflow(i); pauseAutoRotate(); setTimeout(resumeAutoRotate, 1500); });
      card.addEventListener('mouseenter', pauseAutoRotate);
      card.addEventListener('mouseleave', resumeAutoRotate);
    });

    updateCoverflow();
    // startAutoRotate(); // Remove this line so auto-rotate only starts when in view
    window.addEventListener('resize', updateCoverflow);
  }

  // --- Theme Toggle Button (fix) ---
  // Theme toggle logic for both desktop and mobile
  const themeToggle = document.getElementById('theme-toggle');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  function applyTheme() {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isManual = localStorage.getItem('theme');
    let dark = isDark;
    if (isManual === 'dark') dark = true;
    if (isManual === 'light') dark = false;
    if (dark) {
      document.body.classList.remove('light-mode');
      if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      if (mobileThemeToggle) mobileThemeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      document.body.classList.add('light-mode');
      if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      if (mobileThemeToggle) mobileThemeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.contains('light-mode');
      localStorage.setItem('theme', isLight ? 'dark' : 'light');
      applyTheme();
    });
  }
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.contains('light-mode');
      localStorage.setItem('theme', isLight ? 'dark' : 'light');
      applyTheme();
    });
  }
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    localStorage.removeItem('theme');
    applyTheme();
  });
  applyTheme();

  // Make theme toggle draggable on mobile
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  function dragStart(e) {
    if (window.innerWidth <= 900) {
      e.preventDefault();
      if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
      } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
      }

      if (e.target === themeToggle || e.target.closest('.theme-toggle')) {
        isDragging = true;
      }
    }
  }

  function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
  }

  function drag(e) {
    if (isDragging && window.innerWidth <= 900) {
      e.preventDefault();
      
      if (e.type === "touchmove") {
        currentX = e.touches[0].clientX - initialX;
        currentY = e.touches[0].clientY - initialY;
      } else {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
      }

      xOffset = currentX;
      yOffset = currentY;

      const activeToggle = themeToggle;
      if (activeToggle) {
        activeToggle.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
    }
  }

  // Add event listeners for dragging
  document.addEventListener("touchstart", dragStart, false);
  document.addEventListener("touchend", dragEnd, false);
  document.addEventListener("touchmove", drag, false);
  document.addEventListener("mousedown", dragStart, false);
  document.addEventListener("mouseup", dragEnd, false);
  document.addEventListener("mousemove", drag, false);

  // Initialize all animations when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
      // Trigger skills animation and start auto-rotate when skills section is visible
      const skillsSection = document.querySelector('#skills');
      const skillsObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  animateSkills();
                  startAutoRotate();
                  skillsObserver.unobserve(entry.target);
              }
          });
      }, { threshold: 0.5 });
      
      skillsObserver.observe(skillsSection);
  });
}); 

// Mobile-specific enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Improve mobile scroll performance
    let ticking = false;
    function updateOnScroll() {
        revealOnScroll();
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
    
    // Add swipe gestures for mobile navigation
    let touchStartX = 0;
    let touchEndX = 0;
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            const mobileMenu = document.getElementById('mobile-menu');
            const hamburger = document.getElementById('hamburger');
            
            if (swipeDistance < 0 && !mobileMenu.classList.contains('active')) {
                // Swipe left to open menu
                mobileMenu.classList.add('active');
                hamburger.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else if (swipeDistance > 0 && mobileMenu.classList.contains('active')) {
                // Swipe right to close menu
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    // Optimize animations for mobile devices
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        // Reduce animation complexity on mobile for better performance
        document.querySelectorAll('.reveal').forEach(el => {
            el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        });
    }
    
    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            // Recalculate layouts after orientation change
            if (typeof updateCoverflow === 'function') {
                updateCoverflow();
            }
            
            // Close mobile menu on orientation change
            const mobileMenu = document.getElementById('mobile-menu');
            const hamburger = document.getElementById('hamburger');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, 100);
    });
});

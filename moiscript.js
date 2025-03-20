// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Animation des éléments du profil au chargement
    const profileItems = document.querySelectorAll('.profile-item');
    profileItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // Animation des barres de compétences
    animateSkillBars();
    
    // Fonctionnalité des boutons de filtrage de mode
    initModesFilter();
    
    // Fonctionnalité de basculement du thème clair/sombre
    initThemeToggle();
    
    // Gestionnaire de clics pour la galerie du setup
    initSetupGallery();
    
    // Gestionnaire pour le bouton de lecture vidéo
    initVideoPlayer();
    
    // Animation des statistiques (compteur)
    animateStats();
    
    // Initialiser les interactions sociales
    initSocialInteractions();
});

// Animer les barres de compétences
function animateSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');
    
    skillFills.forEach(fill => {
        const targetWidth = fill.style.width;
        fill.style.width = '0%';
        
        setTimeout(() => {
            fill.style.width = targetWidth;
        }, 300);
    });
}

// Initialiser le filtrage des sections du profil
function initModesFilter() {
    const modeButtons = document.querySelectorAll('.mode-btn');
    
    modeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Retire la classe active de tous les boutons
            modeButtons.forEach(b => b.classList.remove('active'));
            // Ajoute la classe active au bouton cliqué
            this.classList.add('active');
            
            const mode = this.getAttribute('data-mode');
            filterProfileItems(mode);
        });
    });
}

// Filtrer les éléments du profil selon le mode sélectionné
function filterProfileItems(mode) {
    const items = document.querySelectorAll('.profile-item');
    
    items.forEach(item => {
        if (mode === 'all' || item.getAttribute('data-category') === mode) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// Initialiser le basculement du thème
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    let isDarkMode = true; // Mode sombre par défaut
    
    // Vérifier si une préférence est stockée dans localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.innerHTML = '<span>🌙</span>';
            isDarkMode = false;
        }
    }
    
    themeToggle.addEventListener('click', function() {
        if (isDarkMode) {
            document.body.classList.add('light-mode');
            this.innerHTML = '<span>🌙</span>';
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            this.innerHTML = '<span>☀️</span>';
            localStorage.setItem('theme', 'dark');
        }
        isDarkMode = !isDarkMode;
    });
}

// Initialiser la galerie du setup
function initSetupGallery() {
    const setupThumbs = document.querySelectorAll('.setup-thumb img');
    const mainSetupImage = document.getElementById('main-setup-image');
    const setupCaption = document.querySelector('.setup-caption');
    
    if (setupThumbs.length && mainSetupImage) {
        // Ajouter la classe active au premier thumbnail par défaut
        setupThumbs[0].classList.add('active');
        
        // Captions pour chaque image (correspondant aux thumbnails)
        const captions = [
            "Mon poste de combat pour dominer sur Valorant",
            "Mes périphériques optimisés pour la performance",
            "Mon PC gaming monté sur mesure"
        ];
        
        setupThumbs.forEach((thumb, index) => {
            thumb.addEventListener('click', function() {
                // Mettre à jour l'image principale
                mainSetupImage.style.opacity = '0';
                setTimeout(() => {
                    mainSetupImage.src = this.src;
                    mainSetupImage.style.opacity = '1';
                    
                    // Mettre à jour la légende si elle existe
                    if (setupCaption) {
                        setupCaption.textContent = captions[index] || "Mon setup gaming";
                    }
                }, 200);
                
                // Ajouter la classe active au thumbnail cliqué
                setupThumbs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
}

// Initialiser le lecteur vidéo
function initVideoPlayer() {
    const playButton = document.querySelector('.play-button');
    const videoContainer = document.querySelector('.video-container');
    
    if (playButton && videoContainer) {
        playButton.addEventListener('click', function() {
            // Dans une implémentation réelle, on remplacerait l'image par une iframe vidéo
            // Pour cette démo, affichons une alerte
            const confirmPlay = confirm('Lancer la vidéo de présentation du setup?');
            
            if (confirmPlay) {
                // Simuler le chargement d'une vidéo
                videoContainer.innerHTML = '<div class="loading-video">Chargement de la vidéo...</div>';
                
                setTimeout(() => {
                    videoContainer.innerHTML = `
                        <div class="video-placeholder">
                            <p>🎬 Vidéo en cours de lecture (simulation)</p>
                            <button class="close-video">Fermer la vidéo</button>
                        </div>
                    `;
                    
                    // Ajouter un gestionnaire pour fermer la vidéo
                    document.querySelector('.close-video').addEventListener('click', function() {
                        videoContainer.innerHTML = `
                            <img src="/api/placeholder/640/360" alt="Vidéo du setup">
                            <div class="play-button">▶</div>
                        `;
                        initVideoPlayer(); // Réinitialiser le lecteur
                    });
                }, 1500);
            }
        });
    }
}

// Animer les statistiques avec un compteur
function animateStats() {
    const statElements = [
        { id: 'hours-stat', target: 1200, suffix: '' },
        { id: 'winrate-stat', target: 56, suffix: '%' }
    ];
    
    statElements.forEach(stat => {
        const element = document.getElementById(stat.id);
        if (element) {
            animateCounter(element, 0, stat.target, 2000, stat.suffix);
        }
    });
}

// Fonction d'animation de compteur
function animateCounter(element, start, end, duration, suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + suffix;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialiser les interactions sociales
function initSocialInteractions() {
    const socialPosts = document.querySelectorAll('.social-post');
    const statButtons = document.querySelectorAll('.post-stats span');
    
    // Animation d'entrée pour les posts sociaux
    socialPosts.forEach((post, index) => {
        setTimeout(() => {
            post.style.opacity = '1';
            post.style.transform = 'translateY(0)';
        }, 200 * index);
    });
    
    // Interactions avec les boutons de statistiques (like, comment, etc.)
    statButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const countElement = this.childNodes[1]; // Le nœud texte contenant le nombre
            
            // Obtenir le nombre actuel
            let count = parseInt(countElement.nodeValue.trim());
            
            // Vérifier si déjà cliqué
            if (icon.classList.contains('fas')) {
                // Déjà liké, donc on retire le like
                icon.classList.replace('fas', 'far');
                count--;
            } else {
                // Pas encore liké, donc on ajoute un like
                icon.classList.replace('far', 'fas');
                count++;
                
                // Ajouter une animation
                this.classList.add('stat-animate');
                setTimeout(() => {
                    this.classList.remove('stat-animate');
                }, 500);
            }
            
            // Mettre à jour le texte
            countElement.nodeValue = ' ' + count;
        });
    });
    
    // Ajouter des écouteurs pour les boutons sociaux
    const socialButtons = document.querySelectorAll('.social-button');
    socialButtons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        button.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', function(e) {
            // Empêcher la navigation (pour la démo)
            e.preventDefault();
            
            // Récupérer la plateforme
            const platform = this.classList[1]; // twitter, instagram, etc.
            alert(`Vous seriez redirigé vers votre compte ${platform} pour suivre 2kOnCroczyBiatch`);
        });
    });
}

// Ajouter des effets de parallaxe légère au défilement
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // Effet de parallaxe sur l'avatar et certains éléments
    const avatar = document.querySelector('.profile-avatar');
    if (avatar) {
        avatar.style.transform = `translateY(${scrollPosition * 0.05}px) rotate(${scrollPosition * 0.02}deg)`;
    }
    
    // Effet sur le titre du héros
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        heroTitle.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        heroTitle.style.opacity = 1 - (scrollPosition * 0.003);
    }
    
    // Animation d'apparition progressive des sections au défilement
    const sections = document.querySelectorAll('.profile-item, .social-feed-container, .stats');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.8) {
            section.classList.add('visible');
        }
    });
});

// Ajouter une classe CSS pour l'animation au défilement
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .profile-item, .social-post {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .stat-animate {
            animation: pulse 0.5s ease;
        }
        
        .loading-video {
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 2rem;
            text-align: center;
            border-radius: 10px;
        }
        
        .video-placeholder {
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 3rem;
            text-align: center;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 300px;
        }
        
        .close-video {
            background: var(--accent);
            border: none;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            margin-top: 1rem;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        
        .close-video:hover {
            transform: scale(1.05);
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
    </style>
`);
// main.js - Script principal pour les fonctionnalités dynamiques

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les composants
    initializeFilterButtons();
    initializeItemAnimation();
    initializeModals();
    initializeThemeToggle();
    initializeProductSearch();
    initializeParticles();
    initializeTooltips();
    addDarkModeListener();
    
    // Charger les statistiques dynamiques si nous sommes sur la page d'accueil
    if (document.querySelector('.stats')) {
        loadStatistics();
    }
});

// Fonction pour initialiser les boutons de filtrage
function initializeFilterButtons() {
    const filterButtons = document.querySelectorAll('.mode-btn');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Enlever la classe active de tous les boutons
            filterButtons.forEach(b => b.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Récupérer le mode de filtrage
            const filterMode = this.getAttribute('data-mode');
            
            // Filtrer les éléments
            filterItems(filterMode);
        });
    });
}

// Fonction pour filtrer les éléments
function filterItems(mode) {
    const items = document.querySelectorAll('.setup-item');
    
    if (items.length === 0) return;
    
    items.forEach(item => {
        if (mode === 'all' || item.getAttribute('data-category') === mode) {
            // Montrer l'élément avec animation
            item.style.opacity = '0';
            item.style.display = 'block';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 50);
        } else {
            // Cacher l'élément avec animation
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// Fonction pour initialiser l'animation des éléments
function initializeItemAnimation() {
    const items = document.querySelectorAll('.setup-item');
    
    if (items.length === 0) return;
    
    // Animer les éléments au chargement avec un délai progressif
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // Ajouter un effet de survol amélioré
    items.forEach(item => {
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculer la position relative à l'élément
            const xPercent = x / rect.width;
            const yPercent = y / rect.height;
            
            // Calculer l'inclinaison (max 5 degrés)
            const tiltX = (xPercent - 0.5) * 5;
            const tiltY = (yPercent - 0.5) * -5;
            
            // Appliquer la transformation
            this.style.transform = `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) translateY(-10px)`;
        });
        
        item.addEventListener('mouseleave', function() {
            // Réinitialiser la transformation avec une transition fluide
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Fonction pour initialiser les modales
function initializeModals() {
    const modal = document.querySelector('.setup-modal');
    const closeModalButton = document.querySelector('.close-modal');
    const setupItems = document.querySelectorAll('.setup-item');
    
    if (!modal || !closeModalButton || setupItems.length === 0) return;
    
    setupItems.forEach(item => {
        item.addEventListener('click', function() {
            // Récupérer les données de l'élément cliqué
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            const imageUrl = this.querySelector('.image-container img').src;
            const price = this.querySelector('.price').textContent;
            const rating = this.querySelector('.rating').textContent;
            const specsList = this.querySelectorAll('.specs li');
            
            // Remplir la modale avec les données
            document.querySelector('.modal-content h2').textContent = 'Détails du produit';
            document.querySelector('.modal-details h3').textContent = title;
            document.querySelector('.modal-description').textContent = description;
            document.querySelector('.modal-image img').src = imageUrl;
            document.querySelector('#modal-price').textContent = price.replace('Prix: ', '');
            document.querySelector('#modal-rating').textContent = rating;
            
            // Remplir la liste des spécifications
            const modalSpecsList = document.querySelector('#modal-specs-list');
            modalSpecsList.innerHTML = '';
            
            specsList.forEach(spec => {
                const li = document.createElement('li');
                li.textContent = spec.textContent;
                modalSpecsList.appendChild(li);
            });
            
            // Afficher la modale avec animation
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        });
    });
    
    // Fermer la modale en cliquant sur le bouton de fermeture
    closeModalButton.addEventListener('click', function() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });
    
    // Fermer la modale en cliquant en dehors du contenu
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });
}

// Fonction pour initialiser le basculement de thème
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (!themeToggle) return;
    
    // Vérifier si un thème est stocké dans le localStorage
    const savedTheme = localStorage.getItem('theme');
    let isDarkMode = savedTheme ? savedTheme === 'dark' : true;
    
    // Appliquer le thème sauvegardé
    if (!isDarkMode) {
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<span>🌙</span>';
    }
    
    themeToggle.addEventListener('click', function() {
        if (isDarkMode) {
            // Basculer vers le mode clair
            document.body.classList.add('light-mode');
            this.innerHTML = '<span>🌙</span>';
            localStorage.setItem('theme', 'light');
        } else {
            // Basculer vers le mode sombre
            document.body.classList.remove('light-mode');
            this.innerHTML = '<span>☀️</span>';
            localStorage.setItem('theme', 'dark');
        }
        
        isDarkMode = !isDarkMode;
    });
}

// Fonction pour initialiser la recherche de produits
function initializeProductSearch() {
    const searchInput = document.querySelector('#search-input');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const items = document.querySelectorAll('.setup-item');
        
        items.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            const specs = Array.from(item.querySelectorAll('.specs li'))
                .map(li => li.textContent.toLowerCase())
                .join(' ');
            
            const content = title + ' ' + description + ' ' + specs;
            
            if (content.includes(searchTerm)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
}

// Fonction pour initialiser les particules d'arrière-plan
function initializeParticles() {
    const particlesContainer = document.querySelector('#particles');
    
    if (!particlesContainer) return;
    
    // Créer des particules aléatoires
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Position aléatoire
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Taille aléatoire
        const size = Math.random() * 5 + 1;
        
        // Vitesse aléatoire
        const speed = Math.random() * 20 + 10;
        
        // Délai aléatoire
        const delay = Math.random() * 5;
        
        // Style des particules
        particle.style.cssText = `
            left: ${posX}%;
            top: ${posY}%;
            width: ${size}px;
            height: ${size}px;
            animation-duration: ${speed}s;
            animation-delay: -${delay}s;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Fonction pour initialiser les infobulles
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    if (tooltipElements.length === 0) return;
    
    tooltipElements.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        
        // Créer l'élément d'infobulle
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        
        // Ajouter l'infobulle au document
        document.body.appendChild(tooltip);
        
        // Gérer les événements
        element.addEventListener('mouseenter', function(e) {
            const rect = element.getBoundingClientRect();
            
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
            
            // Positionner l'infobulle
            const tooltipWidth = tooltip.offsetWidth;
            const left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
            const top = rect.top - tooltip.offsetHeight - 10;
            
            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top}px`;
        });
        
        element.addEventListener('mouseleave', function() {
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
        });
    });
}

// Fonction pour charger les statistiques dynamiquement via AJAX
function loadStatistics() {
    // Dans un environnement réel, vous feriez un appel AJAX ici
    // Pour cette démonstration, nous simulons une réponse
    
    const statsData = {
        'peripherals': 12,
        'furniture': 3,
        'accessories': 8,
        'total_value': 1850.44
    };
    
    // Mettre à jour les cartes de statistiques
    const statCards = document.querySelectorAll('.stat-card h3');
    
    if (statCards.length >= 3) {
        statCards[0].textContent = statsData.peripherals;
        statCards[1].textContent = statsData.furniture;
        statCards[2].textContent = statsData.accessories;
    }
    
    // Ajouter un compteur animé pour la valeur totale
    const totalValueElement = document.querySelector('#total-value');
    
    if (totalValueElement) {
        animateCounter(totalValueElement, 0, statsData.total_value, 2000, '€');
    }
}

// Fonction pour animer un compteur
function animateCounter(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    const updateInterval = 50; // ms
    
    function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        
        if (elapsedTime < duration) {
            const value = start + (end - start) * (elapsedTime / duration);
            element.textContent = value.toFixed(2) + suffix;
            setTimeout(() => requestAnimationFrame(updateCounter), updateInterval);
        } else {
            element.textContent = end.toFixed(2) + suffix;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Fonction pour ajouter un écouteur de media query pour le mode sombre
function addDarkModeListener() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    function handleDarkModeChange(e) {
        const themeToggle = document.querySelector('.theme-toggle');
        const savedTheme = localStorage.getItem('theme');
        
        // Ne pas changer le thème si un thème a été explicitement défini par l'utilisateur
        if (savedTheme) return;
        
        if (e.matches) {
            // Passer en mode sombre
            document.body.classList.remove('light-mode');
            if (themeToggle) themeToggle.innerHTML = '<span>☀️</span>';
        } else {
            // Passer en mode clair
            document.body.classList.add('light-mode');
        }
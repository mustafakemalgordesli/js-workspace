const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.checked = false;
  });
});

const favoriteBtn = document.getElementById('favoriteBtn');
let isFavorite = false;

favoriteBtn.addEventListener('click', () => {
    isFavorite = !isFavorite;
    favoriteBtn.classList.toggle('active');
    
    if (isFavorite) {
        favoriteBtn.innerHTML = '<ion-icon name="heart"></ion-icon> Favorilerden Çıkar';
    } else {
        favoriteBtn.innerHTML = '<ion-icon name="heart"></ion-icon> Favorilere Ekle';
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


document.querySelector('.series-poster').addEventListener('mouseenter', function() {
    document.querySelector('.series-title').style.marginBottom = '1rem';
});

document.querySelector('.series-poster').addEventListener('mouseleave', function() {
    document.querySelector('.series-title').style.marginBottom = '0rem';
});
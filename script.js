// Data untuk ditampilkan secara dinamis
const skillsData = [
    { icon: 'fab fa-html5', title: 'HTML', desc: 'Membuat struktur halaman yang semantik dan terstruktur.' },
    { icon: 'fab fa-css3-alt', title: 'CSS', desc: 'Mendesain tampilan website yang menarik dan responsif.' },
    { icon: 'fab fa-js', title: 'JavaScript', desc: 'Menambahkan interaktivitas dan fungsionalitas dinamis.' },
    { icon: 'fab fa-git-alt', title: 'Git', desc: 'Version control untuk mengelola kode dengan efisien.' }
];

const portfolioData = [
    { title: 'Website Toko Online', desc: 'Membuat website e-commerce dengan fitur keranjang belanja dan checkout.', tags: ['HTML', 'CSS', 'JavaScript'] },
    { title: 'Aplikasi To-Do List', desc: 'Aplikasi web untuk mencatat tugas harian dengan fitur tambah, hapus, dan edit.', tags: ['JavaScript', 'LocalStorage'] },
    { title: 'Landing Page Produk', desc: 'Halaman promosi produk dengan desain modern dan layout responsif.', tags: ['HTML', 'CSS', 'Bootstrap'] }
];

// Fungsi untuk memuat data ke halaman
function loadContent() {
    // Load Skills
    const skillsContainer = document.getElementById('skillsContainer');
    if (skillsContainer) {
        skillsData.forEach(skill => {
            const card = document.createElement('div');
            card.className = 'skill-card';
            card.innerHTML = `
                <i class="${skill.icon}"></i>
                <h3>${skill.title}</h3>
                <p>${skill.desc}</p>
            `;
            skillsContainer.appendChild(card);
        });
    }

    // Load Portfolio
    const portfolioContainer = document.getElementById('portfolioContainer');
    if (portfolioContainer) {
        portfolioData.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.desc}</p>
                ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
            `;
            portfolioContainer.appendChild(card);
        });
    }
}

// Smooth scrolling untuk navigasi
function initSmoothScrolling() {
    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const targetSection = document.querySelector(targetId);
                if(targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Toggle untuk membaca selengkapnya
function initToggleAbout() {
    const toggleBtn = document.getElementById('toggleAboutBtn');
    const aboutExtra = document.getElementById('aboutExtra');
    
    if(toggleBtn && aboutExtra) {
        toggleBtn.addEventListener('click', function() {
            if(aboutExtra.style.display === 'none') {
                aboutExtra.style.display = 'inline';
                toggleBtn.textContent = 'Tutup';
            } else {
                aboutExtra.style.display = 'none';
                toggleBtn.textContent = 'Baca Selengkapnya';
            }
        });
    }
}

// Form handling dengan validasi
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validasi sederhana
            if(name === '' || email === '' || message === '') {
                showFeedback('Semua field harus diisi!', 'error');
                return;
            }
            
            if(!email.includes('@') || !email.includes('.')) {
                showFeedback('Email tidak valid!', 'error');
                return;
            }
            
            // Simulasi pengiriman
            showFeedback('Pesan berhasil dikirim! Terima kasih 🙏', 'success');
            contactForm.reset();
        });
    }
}

function showFeedback(message, type) {
    const feedback = document.getElementById('formFeedback');
    if (feedback) {
        feedback.style.display = 'block';
        feedback.textContent = message;
        feedback.style.color = type === 'error' ? '#e74c3c' : '#27ae60';
        
        setTimeout(() => {
            feedback.style.display = 'none';
        }, 3000);
    }
}

// Visitor counter dengan localStorage
function updateVisitorCounter() {
    let count = localStorage.getItem('visitorCount');
    if(count === null) {
        count = 1;
    } else {
        count = parseInt(count) + 1;
    }
    localStorage.setItem('visitorCount', count);
    
    const counterElement = document.getElementById('counter');
    if (counterElement) {
        counterElement.textContent = count;
    }
}

// Back to top button muncul saat scroll
function initBackToTop() {
    window.addEventListener('scroll', function() {
        if(window.scrollY > 300) {
            if(!document.getElementById('backToTop')) {
                const btn = document.createElement('button');
                btn.id = 'backToTop';
                btn.innerHTML = '↑';
                btn.setAttribute('aria-label', 'Kembali ke atas');
                btn.addEventListener('click', function() {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
                document.body.appendChild(btn);
            }
        } else {
            const btn = document.getElementById('backToTop');
            if(btn) btn.remove();
        }
    });
}

// Animasi fade-in untuk section
function initFadeInAnimation() {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transition = 'opacity 0.8s';
        setTimeout(() => {
            section.style.opacity = '1';
        }, 200 * index);
    });
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    loadContent();
    initSmoothScrolling();
    initToggleAbout();
    initContactForm();
    updateVisitorCounter();
    initBackToTop();
    initFadeInAnimation();
});
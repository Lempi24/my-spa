document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.getElementById('close');
    const imageUrls = Array.from({ length: 9 }, (_, i) => `https://picsum.photos/300/300?random=${i + 1}`);

    // Tworzenie miniatur obrazów
    imageUrls.forEach((url, index) => {
        const img = document.createElement('img');
        img.dataset.src = url; // Lazy loading źródło
        img.alt = `Image ${index + 1}`;
        img.className = 'lazy-load';
        gallery.appendChild(img);
    });

    // Lazy loading
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src; // Ładowanie obrazu
                img.onload = () => img.classList.add('loaded');
                obs.unobserve(img);
            }
        });
    });

    document.querySelectorAll('.lazy-load').forEach(img => observer.observe(img));

    // Obsługa modalnego okna
    gallery.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            modal.style.display = 'flex';
            modalImg.src = e.target.src;
        }
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target !== modalImg) {
            modal.style.display = 'none';
        }
    });
});

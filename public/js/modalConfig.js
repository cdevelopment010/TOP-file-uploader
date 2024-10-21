// modalConfig.js

// Open modal function
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
}

// Close modal function
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
}

// Close modal on close button click or outside click
document.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target.classList.contains('close-modal') || event.target === modal) {
            closeModal(modal.id);
        }
    });
});

// addRecommendation: builds a new recommendation card and triggers the popup
function addRecommendation() {
    const name  = document.getElementById('recommendName').value;
    const title = document.getElementById('recommendTitle').value;
    const text  = document.getElementById('recommendText').value;

    // Create new recommendation card
    const newCard = document.createElement('div');
    newCard.className = 'recommendation-card';
    newCard.innerHTML = `
        <div class="recommendation-header">
            <div class="quote-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-4.716-5-7-5"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-4.716-5-7-5"></path>
                </svg>
            </div>
        </div>
        <p class="recommendation-text">
            "${text}"
        </p>
        <div class="recommendation-author">
            <div class="author-info">
                <h4>${name}</h4>
                <p>${title}</p>
            </div>
        </div>
    `;

    // Add new card to container
    document.getElementById('recommendationsContainer').appendChild(newCard);

    // Clear form
    document.getElementById('recommendationForm').reset();

    // Show popup only when a new recommendation is submitted
    showPopup(true);
}

// Handle recommendation form submission
document.getElementById('recommendationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    addRecommendation();
});

// Show popup — only displays when isNew is true
function showPopup(isNew) {
    if (isNew) {
        document.getElementById('popupModal').style.display = 'flex';
    }
}

// Close popup
function closePopup() {
    document.getElementById('popupModal').style.display = 'none';
}

// Close popup when clicking X
document.querySelector('.close-btn').addEventListener('click', closePopup);

// Close popup when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('popupModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Smooth scroll for home icon
document.getElementById('homeIcon').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.addEventListener('DOMContentLoaded', () => {
    const rsvpForm = document.getElementById('rsvpForm');
    const participantList = document.getElementById('participantList');
    const participantCountSpan = document.getElementById('participantCount');
    const responseMessage = document.getElementById('responseMessage');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
    } else {
        body.setAttribute('data-theme', 'light');
}

    darkModeToggle.addEventListener('click', () => {
        let currentTheme = body.getAttribute('data-theme');
        let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    let currentParticipants = participantList.children.length;
    participantCountSpan.textContent = currentParticipants;

     rsvpForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const nameInput = document.getElementById('name');
        const locationInput = document.getElementById('location');
        const emailInput = document.getElementById('email');

        const name = nameInput.value.trim();
        const location = locationInput.value.trim();
        const email = emailInput.value.trim();

        if (!name || !location || !email) {
            showMessage('Please fill in all fields to sync your flow.', 'error');
            return;
        }

        setTimeout(() => {
            const success = Math.random() > 0.1; // 90% chance of success

            if (success) {
                const newListItem = document.createElement('li');
                newListItem.innerHTML = `<span class="participant-name">${name}</span> from <span class="participant-location">${location}</span> has joined the flow.`;
                participantList.prepend(newListItem); // Add to the top

                currentParticipants++;
                participantCountSpan.textContent = currentParticipants;

                rsvpForm.reset();
                showMessage('Flow synced successfully! Welcome to the collective.', 'success');

                participantList.scrollTop = 0;

            } else {
                showMessage('Flow sync failed. Please try again or check your connection.', 'error');
            }
        }, 1000); 
    });

    function showMessage(message, type) {
        responseMessage.textContent = message;
        responseMessage.className = `response-message ${type}`; // Apply success or error class
        responseMessage.style.visibility = 'visible';
        responseMessage.style.opacity = '1';

        setTimeout(() => {
            responseMessage.style.opacity = '0';
            responseMessage.style.visibility = 'hidden';
        }, 5000);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const rsvpForm = document.getElementById('rsvpForm');
    const participantList = document.getElementById('participantList');
    const participantCountSpan = document.getElementById('participantCount');
    const responseMessage = document.getElementById('responseMessage'); // Ensure this element exists in HTML
    const themeButton = document.getElementById('theme-button'); // Correctly select the theme button
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            applyTheme(savedTheme);
        } else {
            applyTheme('light'); 
        }

        themeButton.addEventListener('click', () => {
            let currentTheme = body.getAttribute('data-theme');
            let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });

    let currentParticipants = participantList.children.length;
    participantCountSpan.textContent = currentParticipants;

    rsvpForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const nameInput = document.getElementById('name');
        const locationInput = document.getElementById('location');
        const emailInput = document.getElementById('email');

        const name = nameInput.value.trim();
        const location = locationInput.value.trim();
        const email = emailInput.value.trim();

        if (!name || !location || !email) {
            showMessage('please fill in all communication fields!', 'error');
            return;
        }

        setTimeout(() => {
            const success = Math.random() > 0.1; 

            if (success) {
                const newListItem = document.createElement('li');
                newListItem.innerHTML = `<span class="participant-name">${name}</span> from <span class="participant-location">${location}</span> has joined the session!`;
                participantList.prepend(newListItem); 

                currentParticipants++;
                participantCountSpan.textContent = currentParticipants;

                rsvpForm.reset();
                showMessage('study session joined successfully! welcome to the community!', 'success');

                participantList.scrollTop = 0;

            } else {
                showMessage('uh oh, something went wrong. please try again or check your connection.', 'error');
            }
        }, 1000); 
    });

    function showMessage(message, type) {
        responseMessage.textContent = message;
        responseMessage.className = `response-message ${type}`; 
        responseMessage.style.visibility = 'visible';
        responseMessage.style.opacity = '1';

        setTimeout(() => {
            responseMessage.style.opacity = '0';
            responseMessage.style.visibility = 'hidden';
        }, 5000);
    }
});
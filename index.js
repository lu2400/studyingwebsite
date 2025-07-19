let themeButton = document.getElementById('theme-button');

const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
}

// Step 1: Query for the button using its id, and save it to a variable.
const submitButton = document.getElementById('rsvp-button');
const rsvpForm = document.getElementById('rsvp-form'); 
const rsvpParticipantsDiv = document.getElementById('rsvp-participants');
const participantList = document.getElementById('participantList'); 
const participantCountSpan = document.getElementById('participantCount');
const responseMessage = document.getElementById('responseMessage');

themeButton.addEventListener("click", toggleDarkMode);

const addParticipant = (event) => {
    event.preventDefault();
    
    const nameInput = document.getElementById('name');
    const locationInput = document.getElementById('location');
    const emailInput = document.getElementById('email');

    const name = nameInput.value.trim();
    const location = locationInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !location || !email) {
        responseMessage.textContent = "uh oh, not all the fields were filled out! please try again.";
        return;
    }

    const newParticipantP = document.createElement('p');
    newParticipantP.innerHTML = `<strong>${name}</strong> from <em>${location}</em> has RSVP'd!</a>`;
    rsvpParticipantsDiv,prepend(newParticipantP);

    currentParticipantCount ++;
    participantCountSpan.textContent = currentParticipantCount;

    rsvpForm.reset();
    showMessage('welcome, thank you for your RSVP!');
    

    submitButton.addEventListener('click', addParticipant);
}
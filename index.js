let themeButton = document.getElementById('theme-button');

const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
}
themeButton.addEventListener("click", toggleDarkMode);

let count = 3;
// Step 1: Add your query for the submit RSVP button here
const rsvpButton = document.getElementById('rsvp-button');

const addParticipant = (event) => {
    // Step 2: Write your code to manipulate the DOM here

  event.preventDefault();

  const name = document.getElementById('name').value;
  const location = document.getElementById('location').value;

  const newParticipant = document.createElement('p');

  newParticipant.textContent = `𓂃⋆.˚ ${name} from ${location} has RSVP'd.`;

  const participantsList = document.querySelector('.rsvp-participants');
  participantsList.appendChild(newParticipant);

  const oldCount = document.getElementById('rsvp-count');
  if (oldCount) {
      oldCount.remove();
  }

  count=count+1;

  const newCounter = document.createElement('p');
  newCounter.id = 'rsvp-count'; //
  newCounter.textContent = "𓂃⋆.˚ " + count + " people have RSVP'd to this event!";
  participantsList.appendChild(newCounter);
  
  document.getElementById('name').value = "";
  document.getElementById('location').value = "";
  document.getElementById('email').value = "";
}

// Step 3: Add a click event listener to the submit RSVP button here
rsvpButton.addEventListener("click", addParticipant);
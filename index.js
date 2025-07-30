let themeButton = document.getElementById('theme-button');
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
}
themeButton.addEventListener("click", toggleDarkMode);

let count = 3;
const rsvpButton = document.getElementById('rsvp-button');
const rsvpInputs = document.querySelectorAll("#rsvp-form input");

const addParticipant = () => {
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
  count = count + 1;
  const newCounter = document.createElement('p');
  newCounter.id = 'rsvp-count';
  newCounter.textContent = "𓂃⋆.˚ " + count + " people have RSVP'd to this event!";
  participantsList.appendChild(newCounter);
};

const validateForm = (event) => {
  event.preventDefault(); 
  let containsErrors = false;

  for (let i = 0; i < rsvpInputs.length; i++) {
    if (rsvpInputs[i].value.length < 2) {
      containsErrors = true;
      rsvpInputs[i].classList.add("error");
    } else {
      rsvpInputs[i].classList.remove("error");
    }
  }

  const email = document.getElementById('email');
  if (!email.value.includes('@')) {
    containsErrors = true;
    email.classList.add('error');
  }

  if (containsErrors === false) {
    addParticipant(); 

    for (let i = 0; i < rsvpInputs.length; i++) {
      rsvpInputs[i].value = "";
    }
  }
};

rsvpButton.addEventListener("click", validateForm);
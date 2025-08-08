
let themeButton = document.getElementById('theme-button');
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
}
themeButton.addEventListener("click", toggleDarkMode);

let motionEnabled = true;
const reduceMotionBtn = document.getElementById('reduce-motion-btn');
const reduceMotion = () => {
    motionEnabled = !motionEnabled; 
    reduceMotionBtn.textContent = motionEnabled ? "reduce motion" : "enable motion";
}
reduceMotionBtn.addEventListener('click', reduceMotion);

const rsvpButton = document.getElementById('rsvp-button');
const rsvpInputs = document.querySelectorAll("#rsvp-form input");
let count = 3;

const addParticipant = (person) => {
  const newParticipant = document.createElement('p');
  newParticipant.textContent = `𓂃⋆.˚ ${person.name} from ${person.location} has RSVP'd.`;
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

let rotateFactor = 0;
const animateImage = () => {
    const modalImage = document.getElementById('modal-image');
    if (rotateFactor === 0) {
        rotateFactor = -10;
    } else {
        rotateFactor = 0;
    }
    modalImage.style.transform = `rotate(${rotateFactor}deg)`;
};

const toggleModal = (person) => {
    const modal = document.getElementById('thanks-modal');
    const modalContent = document.getElementById('modal-text');
    const closeModalBtn = document.getElementById('close-modal-btn');
    let intervalId = null;

    const hideModal = () => {
        modal.style.display = 'none';
        if (intervalId) {
            clearInterval(intervalId); 
        }
    };

    modalContent.textContent = `thanks for rsvping, ${person.name}! can't wait to see you soon!`;
    modal.style.display = "flex";
    closeModalBtn.addEventListener('click', hideModal);

    if (motionEnabled) {
        intervalId = setInterval(animateImage, 500); 
    }
    setTimeout(hideModal, 5000);
};

const validateForm = (event) => {
  event.preventDefault();
  let containsErrors = false;
  const person = {
      name: document.getElementById('name').value,
      location: document.getElementById('location').value,
      email: document.getElementById('email').value
  };

  for (let i = 0; i < rsvpInputs.length; i++) {
    const inputField = rsvpInputs[i];
    const propertyName = inputField.name;
    if (person[propertyName].length < 2) {
      containsErrors = true;
      inputField.classList.add("error");
    } else {
      inputField.classList.remove("error");
    }
  }

  if (!person.email.includes('@')) {
    containsErrors = true;
    document.getElementById('email').classList.add('error');
  }

  if (containsErrors === false) {
    addParticipant(person);
    toggleModal(person);
    for (let i = 0; i < rsvpInputs.length; i++) {
      rsvpInputs[i].value = "";
    }
  }
};

rsvpButton.addEventListener("click", validateForm);
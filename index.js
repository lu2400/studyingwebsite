const STORAGE_KEYS = {
  theme: "study-theme",
  reducedMotion: "study-reduced-motion"
};

const themeButton = document.getElementById("theme-button");
const reduceMotionBtn = document.getElementById("reduce-motion-btn");
const rsvpForm = document.getElementById("rsvp-form");
const rsvpInputs = Array.from(document.querySelectorAll("#rsvp-form input"));
const participantsList = document.getElementById("participants-list");
const rsvpCount = document.getElementById("rsvp-count");
const errorSummary = document.getElementById("form-errors");
const modal = document.getElementById("thanks-modal");
const modalText = document.getElementById("modal-text");
const closeModalBtn = document.getElementById("close-modal-btn");
const modalImage = document.getElementById("modal-image");

let motionEnabled = true;
let modalTimerId = null;
let imageAnimId = null;
let previouslyFocusedElement = null;
let participantCount = participantsList?.children.length ?? 0;

const applyTheme = (isDarkMode) => {
  document.body.classList.toggle("dark-mode", isDarkMode);
  themeButton.setAttribute("aria-pressed", String(isDarkMode));
  themeButton.textContent = isDarkMode ? "light mode" : "dark mode";
};

const applyMotionPreference = (enableMotion) => {
  motionEnabled = enableMotion;
  document.body.classList.toggle("reduced-motion", !motionEnabled);
  reduceMotionBtn.setAttribute("aria-pressed", String(!motionEnabled));
  reduceMotionBtn.textContent = motionEnabled ? "reduce motion" : "enable motion";
};

const initializePreferences = () => {
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const systemPrefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const storedTheme = localStorage.getItem(STORAGE_KEYS.theme);
  const storedMotion = localStorage.getItem(STORAGE_KEYS.reducedMotion);

  const isDarkMode = storedTheme ? storedTheme === "dark" : systemPrefersDark;
  const shouldReduceMotion = storedMotion
    ? storedMotion === "true"
    : systemPrefersReducedMotion;

  applyTheme(isDarkMode);
  applyMotionPreference(!shouldReduceMotion);
};

const handleThemeToggle = () => {
  const isDarkMode = !document.body.classList.contains("dark-mode");
  applyTheme(isDarkMode);
  localStorage.setItem(STORAGE_KEYS.theme, isDarkMode ? "dark" : "light");
};

const handleMotionToggle = () => {
  applyMotionPreference(!motionEnabled);
  localStorage.setItem(STORAGE_KEYS.reducedMotion, String(!motionEnabled));
};

const observeReveals = () => {
  const revealElements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((element) => observer.observe(element));
};

const updateCountText = () => {
  rsvpCount.textContent = `𓂃⋆.˚ ${participantCount} people have RSVP'd to this event!`;
};

const addParticipant = (person) => {
  const listItem = document.createElement("li");
  listItem.textContent = `𓂃⋆.˚ ${person.name} from ${person.location} has RSVP'd.`;
  participantsList.appendChild(listItem);
  participantCount += 1;
  updateCountText();
};

const toggleImageAnimation = () => {
  let rotateFactor = -9;
  imageAnimId = window.setInterval(() => {
    rotateFactor = rotateFactor === -9 ? 6 : -9;
    modalImage.style.transform = `rotate(${rotateFactor}deg)`;
  }, 560);
};

const clearImageAnimation = () => {
  if (imageAnimId) {
    window.clearInterval(imageAnimId);
    imageAnimId = null;
  }
  modalImage.style.transform = "rotate(0deg)";
};

const getFocusableElements = (container) =>
  Array.from(
    container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute("disabled"));

const handleModalKeydown = (event) => {
  if (event.key === "Escape") {
    hideModal();
    return;
  }

  if (event.key !== "Tab") {
    return;
  }

  const focusableElements = getFocusableElements(modal);
  if (focusableElements.length === 0) {
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
};

function hideModal() {
  modal.hidden = true;
  modal.removeEventListener("keydown", handleModalKeydown);
  clearImageAnimation();
  if (modalTimerId) {
    window.clearTimeout(modalTimerId);
    modalTimerId = null;
  }
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus();
  }
}

const showModal = (person) => {
  previouslyFocusedElement = document.activeElement;
  modalText.textContent = `Thanks for RSVPing, ${person.name}! Can't wait to see you soon!`;
  modal.hidden = false;

  if (motionEnabled) {
    toggleImageAnimation();
  }

  closeModalBtn.focus();
  modal.addEventListener("keydown", handleModalKeydown);
  modalTimerId = window.setTimeout(hideModal, 5000);
};

const setFieldError = (input, message) => {
  const errorElement = document.getElementById(`${input.id}-error`);
  input.setAttribute("aria-invalid", String(Boolean(message)));
  errorElement.textContent = message;
};

const clearErrors = () => {
  errorSummary.textContent = "";
  rsvpInputs.forEach((input) => setFieldError(input, ""));
};

const validateForm = () => {
  const person = {
    name: document.getElementById("name").value.trim(),
    location: document.getElementById("location").value.trim(),
    email: document.getElementById("email").value.trim()
  };
  const messages = [];

  clearErrors();

  if (person.name.length < 2) {
    const message = "Please enter a name with at least 2 characters.";
    setFieldError(document.getElementById("name"), message);
    messages.push(message);
  }

  if (person.location.length < 2) {
    const message = "Please add your city and country.";
    setFieldError(document.getElementById("location"), message);
    messages.push(message);
  }

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(person.email);
  if (!emailIsValid) {
    const message = "Please enter a valid email address.";
    setFieldError(document.getElementById("email"), message);
    messages.push(message);
  }

  if (messages.length > 0) {
    errorSummary.textContent = "Please fix the highlighted fields before submitting.";
    const firstInvalidInput = rsvpInputs.find(
      (input) => input.getAttribute("aria-invalid") === "true"
    );
    if (firstInvalidInput) {
      firstInvalidInput.focus();
    }
    return null;
  }

  return person;
};

const handleRsvpSubmit = (event) => {
  event.preventDefault();
  const person = validateForm();
  if (!person) {
    return;
  }

  addParticipant(person);
  showModal(person);
  rsvpForm.reset();
  clearErrors();
};

initializePreferences();
observeReveals();
updateCountText();

themeButton.addEventListener("click", handleThemeToggle);
reduceMotionBtn.addEventListener("click", handleMotionToggle);
rsvpForm.addEventListener("submit", handleRsvpSubmit);
closeModalBtn.addEventListener("click", hideModal);
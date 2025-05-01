// small screen navigator
var tablinks = document.getElementsByClassName("tab-links");

var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
  for (tablink of tablinks) {
    tablink.classList.remove("active-link");
  }

  for (tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

// small screen menu displayer
function openmenu() {
  menu.style.right = "0px";
  menuIsOpen = true;
  closeMenuIcon.style.display = "inline";
}
function closemenu() {
  menu.style.right = "-150px";
  menuIsOpen = false;
  closeMenuIcon.style.display = "none";
}

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && menuIsOpen) {
    closemenu();
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// submit-to-google-sheet
const scriptURL =
  "https://script.google.com/macros/s/AKfycbzAmsIJ4WnKA2fCWgfIDoIqv5QA0-NbCvCVDMe2g6JIqyv7ekRvCikPRfCc3IyDJtsM/exec";
const form = document.forms["submit-to-google-sheet"];
const msgsuccess = document.getElementById("msgsuccess");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msgsuccess.innerHTML = "Message sent successfully.";
      setTimeout(function () {
        msgsuccess.innerText = "";
      }, 6000);
      form.reset();
    })
    .catch((error) => console.error("Error!", error.message));
});

// Phone option displayer
function togglePhoneInput() {
  const contactMethod = document.getElementById("contact_method").value;
  const phoneContainer = document.getElementById("phone_container");

  if (contactMethod === "phone") {
    phoneContainer.style.display = "block";
    phoneContainer.style.margin = "15px 0px";
    phoneInput.setAttribute("required");
  } else {
    phoneContainer.style.display = "none";
    phoneInput.removeAttribute("required");
  }
}

// Header time counting
function updateTime() {
  const now = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  document.getElementById("timeDisplay").textContent = now.toLocaleTimeString(
    undefined,
    options
  );
}
setInterval(updateTime, 1000);
updateTime();

// Timer for upcoming project
const twoWeeksInSeconds = 3 * 7 * 24 * 60 * 60; // 3 weeks in seconds
let timeLeft = twoWeeksInSeconds;

function startCountdown() {
  const countdown = setInterval(() => {
    timeLeft -= 1;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(countdown);
      document.getElementById("timer").textContent = "Time's up!";
    }
  }, 1000);
}
function updateTimerDisplay() {
  const days = Math.floor(timeLeft / (24 * 60 * 60));
  const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
  const seconds = timeLeft % 60;

  document.getElementById(
    "timer"
  ).textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
startCountdown();

const user = "merihunharka14";
const domain = "gmail.com";
document.getElementById("email").innerHTML = `
   <a style="color: #ffffff; margin-right:40px;" href="mailto:${user}@${domain}">
     ${user}@${domain}
   </a>
   `;

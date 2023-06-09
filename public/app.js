// Declare Variables

// Mobile Menu Variables
var menu = document.querySelector(".mobileMenuIcon");
var closeBtn = document.querySelector(".closeBtn");

// NodeMailer Variables
var email = document.querySelector(".emailInput");
var username = document.querySelector(".nameInput");
var form = document.querySelector("form");
var messageDiv = document.querySelector(".messageDiv");
var messageP = document.querySelector(".messageP");

// Scroll Animation Variables
var navLinks = document.querySelectorAll("a");
var html = document.querySelector("html");

mobileMenu();
scrollAnimation();
revealSlider();
emailMessenger();

// Mobile Menu
function mobileMenu() {
  menu.addEventListener("click", function (e) {
    if (
      e.currentTarget.parentElement.parentElement.className == "mobileMenu sec"
    ) {
      // App Menu
      e.currentTarget.parentElement.parentElement.previousElementSibling.style.width =
        "100vw";
    }
  });

  closeBtn.addEventListener("click", function (e) {
    if (e.currentTarget.parentElement.className == "menuOverlay") {
      // App Menu Close Btn
      e.currentTarget.parentElement.style.width = "0px";
    }
  });
}

// Scroll Animation
function scrollAnimation() {
  navLinks.forEach(function (a) {
    a.addEventListener("click", function (e) {
      var promise1 = new Promise(function (resolve, reject) {
        html.style.scrollBehavior = "smooth";
        setTimeout(function () {
          resolve();
        }, 1000);
      });

      promise1.then(function () {
        if (
          a.parentElement.parentElement.parentElement.parentElement.className ==
          "menuOverlay"
        ) {
          // Menu Overlay
          menu.parentElement.parentElement.previousElementSibling.style.width =
            "0";
        } else {
          return null;
        }
      });
    });
  });
}

// FAQ Reveal Slider Script
function revealSlider() {
  var arrows = document.querySelectorAll(".faqLi .imgHolder");
  var answers = document.querySelectorAll(".answer");
  var faq = document.querySelector(".faqUl");

  // Add the click event to arrows
  arrows.forEach(function (arrow) {
    arrow.addEventListener("click", function (e) {
      var answer = e.currentTarget.parentElement.nextElementSibling;

      if (this.classList.contains("rotated")) {
        // If the arrow that your clicking is the only one open, close it & the answer div
        this.style.transform = "rotate(0deg)";
        this.classList.remove("rotated");
        answer.style.height = 0 + "px";
      } else {
        // Turn any arrows right & close any open answer divs
        for (let i = 0; i < arrows.length; i++) {
          if (arrows[i].classList.contains("rotated")) {
            arrows[i].style.transform = "rotate(0deg)";
            arrows[i].classList.remove("rotated");
            answers[i].style.height = 0 + "px";
          }
        }
        // Turn the arrow that your clicking on down
        e.currentTarget.classList.add("rotated");
        e.currentTarget.style.transform = "rotate(90deg)";
        answer.style.height = 135 + "px";
      }
    });
  });
}

// NodeMailer
function emailMessenger() {
  // Hide the message div when focusing on the inputs
  email.addEventListener("focus", function (e) {
    if (messageDiv.style.opacity == "1") {
      messageDiv.style.opacity = "0";
    }

    email.placeholder = " ";
  });

  username.addEventListener("focus", function (e) {
    if (messageDiv.style.opacity == "1") {
      messageDiv.style.opacity = "0";
    }

    username.placeholder = " ";
  });

  // Place the placeholder back in the input if input equals blank
  email.addEventListener("blur", function (e) {
    if (email.value == "") {
      email.placeholder = "John123@gmail.com";
    }
  });

  username.addEventListener("blur", function (e) {
    if (username.value == "") {
      username.placeholder = "John";
    }
  });

  // Form Validation
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate the form before sending
    if (email.value.search(/@.+\./i) == -1 || username.value == "") {
      form.reset();
      return errMessage();
    }

    // Send a fetch request to the server to send an email
    var dataObj = { email: email.value, username: username.value };
    fetch("/mailer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataObj)
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Show message div
        showMessage();
        form.reset();
      })
      .catch((err) => {
        console.log(err);
        // Show error div
        errMessage();
        form.reset();
      });
  });
}

function showMessage() {
  messageDiv.style.opacity = "1";
}

function errMessage() {
  messageP.style.color = "#fff";
  messageP.innerText = "Error! Please try again.";
  messageDiv.style.opacity = "1";
}

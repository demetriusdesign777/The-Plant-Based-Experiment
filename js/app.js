// Mobile Menu Script

var menu = document.querySelector(".mobileMenuIcon");
var closeBtn = document.querySelector(".closeBtn");

menu.addEventListener("click", function(e) {
    if(e.currentTarget.parentElement.parentElement.className == "mobileMenu sec") {
        // App Menu
        e.currentTarget.parentElement.parentElement.previousElementSibling.style.width = "100vw";
    } else {
        console.log("Something's Wrong!")
        console.log(e.currentTarget.parentElement.className)
    }
})

closeBtn.addEventListener("click", function(e) {
    if(e.currentTarget.parentElement.className == "menuOverlay") {
        // App Menu Close Btn
        e.currentTarget.parentElement.style.width = "0px";
    }
})

// FAQ Reveal Slider Script

revealSlider();

function revealSlider() {
    var arrows = document.querySelectorAll(".faqLi .imgHolder");
    var answers = document.querySelectorAll(".answer");
    var faq = document.querySelector(".faqUl");

    //faq.style.height = 200 + "px";

    // Add the click event to arrows
    arrows.forEach(function(arrow) {
        arrow.addEventListener("click", function(e) {
            var answer = e.currentTarget.parentElement.nextElementSibling;

            if(this.classList.contains('rotated')) {
                // If the arrow that your clicking is the only one open, close it & the answer div
                this.style.transform = "rotate(0deg)";
                this.classList.remove('rotated');
                answer.style.height = 0 + "px";
            } else {
                // Turn any arrows right & close any open answer divs
                for(let i = 0; i < arrows.length; i++) {
                    if(arrows[i].classList.contains('rotated')) {
                        arrows[i].style.transform = "rotate(0deg)";
                        arrows[i].classList.remove('rotated');
                        answers[i].style.height = 0 + "px";
                    }
                }
                // Turn the arrow that your clicking on down
                e.currentTarget.classList.add('rotated');
                e.currentTarget.style.transform = "rotate(90deg)";
                answer.style.height = 135 + "px";
            }
        })
    })
}
var btn = document.querySelector(".btn");
var resume = document.querySelector(".resume");
var welcome = document.querySelector(".welcomepage");
document.addEventListener("DOMContentLoaded", function () {
    btn.addEventListener("click", function () {
        welcome.style.display = "none";
        resume.style.display = "block";
    });
});
var skillbtn = document.querySelector(".toggleskill");
var skillssec = document.querySelector(".skills-section");
document.addEventListener("DOMContentLoaded", function () {
    if (skillbtn) {
        skillbtn.addEventListener("click", function () {
            if (skillssec) {
                if (skillssec.style.display === 'none') {
                    skillssec.style.display = 'block';
                    skillbtn.innerText = "Hide Skills";
                }
                else {
                    skillssec.style.display = 'none';
                    skillbtn.innerText = "Show Skills";
                }
            }
        });
    }
});

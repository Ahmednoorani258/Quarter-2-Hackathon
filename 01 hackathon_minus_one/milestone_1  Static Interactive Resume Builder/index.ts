const btn = document.querySelector(".btn") as HTMLButtonElement;
const resume = document.querySelector(".resume") as HTMLDivElement;
const welcome = document.querySelector(".welcomepage") as HTMLDivElement;


document.addEventListener("DOMContentLoaded",() => {
    btn.addEventListener("click", () => {
        welcome.style.display = "none";
        resume.style.display = "block";
    })
})

const skillbtn = document.querySelector(".toggleskill") as HTMLButtonElement;
const skillssec = document.querySelector(".skills-section") as HTMLDivElement;

document.addEventListener("DOMContentLoaded", () => {
    if(skillbtn) {
        skillbtn.addEventListener("click", () => {
            if(skillssec){
                if(skillssec.style.display === 'none') {
                    skillssec.style.display = 'block';
                    skillbtn.innerText = "Hide Skills";
                }else{
                    skillssec.style.display = 'none';
                    skillbtn.innerText = "Show Skills";
                }
            }
        })
    }   
})
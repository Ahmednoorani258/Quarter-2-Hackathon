let myName:any= document.getElementById('name')
let designation:any= document.getElementById('designation')
let phone:any = document.getElementById('phone')
let email:any = document.getElementById('email')
let address:any = document.getElementById('address')
let passingyear:any = document.getElementById('passingyear')
let degree :any= document.getElementById('degree')
let institution:any = document.getElementById('institution')
let skills :any= document.getElementById('skills')
let language :any= document.getElementById('language')
let startyear :any= document.getElementById('startyear')
let endyear:any = document.getElementById('endyear')
let company :any= document.getElementById('company')
let companylocation:any = document.getElementById('companylocation')
let jobtitle:any = document.getElementById('jobtitle')
let responsibilities:any = document.getElementById('responsibilities')

let submitbtn :any= document.getElementById('submitbtn')
let form:any = document.getElementById('form')

console.log(myName,designation,phone,email,address,passingyear,degree,institution,skills,language,startyear,endyear,company,companylocation,jobtitle,responsibilities,submitbtn,form)

form?.addEventListener('submit',(e) => {
    e.preventDefault()
    localStorage.setItem("myname",myName.value)
    localStorage.setItem("designation",designation.value)
    localStorage.setItem("phone",phone.value)
    localStorage.setItem("email",email.value)
    localStorage.setItem("address",address.value)
    localStorage.setItem("passingyear",passingyear.value)
    localStorage.setItem("degree",degree.value)
    localStorage.setItem("institution",institution.value)
    localStorage.setItem("skills",skills.value)
    localStorage.setItem("language",language.value)
    localStorage.setItem("startyear",startyear.value)
    localStorage.setItem("endyear",endyear.value)
    localStorage.setItem("company",company.value)
    localStorage.setItem("companylocation",companylocation.value)
    localStorage.setItem("jobtitle",jobtitle.value)
    localStorage.setItem("responsibilities",responsibilities.value)

<<<<<<< HEAD
    window.location.href = ""
=======
    window.location.href
>>>>>>> 72386aa800119018cc47a7ae9b9235dd96837498
})


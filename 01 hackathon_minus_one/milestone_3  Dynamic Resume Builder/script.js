// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    // Fetch the form data
    var resumeData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        address: document.getElementById('address').value.trim(),
        summary: document.getElementById('summary').value.trim(),
        skills: document.getElementById('skills').value.split(',').map(function (skill) { return skill.trim(); }),
        education: {
            degree: document.getElementById('degreename').value.trim(),
            institute: document.getElementById('institute').value.trim(),
            year: document.getElementById('year').value.trim(),
        },
        experience: {
            company: document.getElementById('company').value.trim(),
            designation: document.getElementById('designation').value.trim(),
            experience: document.getElementById('experience').value.trim(),
        },
        languages: document.getElementById('languages').value.split(',').map(function (lang) { return lang.trim(); }),
    };
    // Handle image upload if provided
    var imageInput = document.getElementById('image');
    if (imageInput.files && imageInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            if (e.target && e.target.result) {
                resumeData.image = e.target.result; // Assign the image to the resume data
                generateResumePreview(resumeData);
            }
        };
        reader.readAsDataURL(imageInput.files[0]); // Convert the image to a data URL
    }
    else {
        // Generate resume preview without image
        generateResumePreview(resumeData);
    }
}
// Function to generate and display the resume preview
function generateResumePreview(data) {
    var previewElement = document.getElementById('resume-preview');
    if (!previewElement) {
        console.error('Could not find resume-preview element.');
        return;
    }
    if (previewElement) {
        previewElement.scrollIntoView({ behavior: 'smooth' });
    }
    // Dynamically generate the resume content
    previewElement.innerHTML = "\n        <div>\n        <section class=\"sec1\">\n        ".concat(data.image ? "<img src=\"".concat(data.image, "\" alt=\"").concat(data.name, "'s Image\" />") : '', "\n        <h2>").concat(data.name, "</h2>\n        \n        <p id=\"top\"><strong>Email:</strong> ").concat(data.email, "</p>\n        <p id=\"top\"><strong>Phone:</strong> ").concat(data.phone, "</p>\n        <p id=\"top\"><strong>Address:</strong> ").concat(data.address, "</p>\n        <h3>About Me</h3>\n        <p>").concat(data.summary, "</p>\n\n        \n\n        </section>\n        <section class=\"sec2\">\n        <h3>Education</h3>\n        <p><strong>Degree:</strong> ").concat(data.education.degree, "</p>\n        <p><strong>Institute:</strong> ").concat(data.education.institute, "</p>\n        <p><strong>Year:</strong> ").concat(data.education.year, "</p>\n        <h3>Experience</h3>\n        <p><strong>Company:</strong> ").concat(data.experience.company, "</p>\n        <p><strong>Designation:</strong> ").concat(data.experience.designation, "</p>\n        <p><strong>Experience:</strong> ").concat(data.experience.experience, "</p>\n        <h3>Skills</h3>\n        <ul>").concat(data.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "</ul>\n        <h3>Languages</h3>\n        <ul>").concat(data.languages.map(function (language) { return "<li>".concat(language, "</li>"); }).join(''), "</ul>\n        </section>\n        </div>\n        \n    ");
}
// Function to initialize form event listeners
function initializeForm() {
    var form = document.getElementById('resume-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    else {
        console.error('Could not find resume-form element.');
    }
}
// Initialize form when the document is fully loaded
window.addEventListener('DOMContentLoaded', initializeForm);

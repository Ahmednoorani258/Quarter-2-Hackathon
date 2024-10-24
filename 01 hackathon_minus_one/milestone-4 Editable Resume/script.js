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
function generateResumePreview(data) {
    var previewElement = document.getElementById('resume-preview');
    if (!previewElement) {
        console.error('Could not find resume-preview element.');
        return;
    }
    if (previewElement) {
        previewElement.scrollIntoView({ behavior: 'smooth' });
    }
    // Dynamically generate the resume content with contenteditable
    previewElement.innerHTML = "\n        <div>\n        <section class=\"sec1\">\n        ".concat(data.image ? "<img src=\"".concat(data.image, "\" alt=\"").concat(data.name, "'s Image\" />") : '', "\n        <h2 contenteditable=\"true\" id=\"editable-name\">").concat(data.name, "</h2>\n        \n        <p id=\"top\" contenteditable=\"true\"><strong>Email:</strong> ").concat(data.email, "</p>\n        <p id=\"top\" contenteditable=\"true\"><strong>Phone:</strong> ").concat(data.phone, "</p>\n        <p id=\"top\" contenteditable=\"true\"><strong>Address:</strong> ").concat(data.address, "</p>\n        <h3>About Me</h3>\n        <p contenteditable=\"true\" id=\"editable-summary\">").concat(data.summary, "</p>\n\n        </section>\n        <section class=\"sec2\">\n        <h3>Education</h3>\n        <p contenteditable=\"true\" id=\"editable-degree\"><strong>Degree:</strong> ").concat(data.education.degree, "</p>\n        <p contenteditable=\"true\" id=\"editable-institute\"><strong>Institute:</strong> ").concat(data.education.institute, "</p>\n        <p contenteditable=\"true\" id=\"editable-year\"><strong>Year:</strong> ").concat(data.education.year, "</p>\n\n        <h3>Experience</h3>\n        <p contenteditable=\"true\" id=\"editable-company\"><strong>Company:</strong> ").concat(data.experience.company, "</p>\n        <p contenteditable=\"true\" id=\"editable-designation\"><strong>Designation:</strong> ").concat(data.experience.designation, "</p>\n        <p contenteditable=\"true\" id=\"editable-experience\"><strong>Experience:</strong> ").concat(data.experience.experience, "</p>\n\n        <h3>Skills</h3>\n        <ul>\n            ").concat(data.skills.map(function (skill, index) { return "\n                <li contenteditable=\"true\" id=\"editable-skill-".concat(index, "\">").concat(skill, "</li>"); }).join(''), "\n        </ul>\n\n        <h3>Languages</h3>\n        <ul>\n            ").concat(data.languages.map(function (language, index) { return "\n                <li contenteditable=\"true\" id=\"editable-language-".concat(index, "\">").concat(language, "</li>"); }).join(''), "\n        </ul>\n        </section>\n        </div>\n    ");
    addEditListeners(data);
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
// Add event listeners to each editable section
function addEditListeners(data) {
    // Name
    var nameElement = document.getElementById('editable-name');
    nameElement.addEventListener('input', function () {
        data.name = nameElement.textContent || '';
    });
    // Education - Degree, Institute, Year
    var degreeElement = document.getElementById('editable-degree');
    degreeElement.addEventListener('input', function () {
        data.education.degree = degreeElement.textContent || '';
    });
    var instituteElement = document.getElementById('editable-institute');
    instituteElement.addEventListener('input', function () {
        data.education.institute = instituteElement.textContent || '';
    });
    var yearElement = document.getElementById('editable-year');
    yearElement.addEventListener('input', function () {
        data.education.year = yearElement.textContent || '';
    });
    // Professional Experience - Company, Designation, Experience
    var companyElement = document.getElementById('editable-company');
    companyElement.addEventListener('input', function () {
        data.experience.company = companyElement.textContent || '';
    });
    var designationElement = document.getElementById('editable-designation');
    designationElement.addEventListener('input', function () {
        data.experience.designation = designationElement.textContent || '';
    });
    var experienceElement = document.getElementById('editable-experience');
    experienceElement.addEventListener('input', function () {
        data.experience.experience = experienceElement.textContent || '';
    });
    // Skills and Languages (dynamically added items)
    data.skills.forEach(function (_, index) {
        var skillElement = document.getElementById("editable-skill-".concat(index));
        skillElement.addEventListener('input', function () {
            data.skills[index] = skillElement.textContent || '';
        });
    });
    data.languages.forEach(function (_, index) {
        var langElement = document.getElementById("editable-language-".concat(index));
        langElement.addEventListener('input', function () {
            data.languages[index] = langElement.textContent || '';
        });
    });
}

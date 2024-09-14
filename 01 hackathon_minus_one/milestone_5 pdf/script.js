function handleFormSubmit(event) {
    event.preventDefault();
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
    console.log('Form Data:', resumeData); // Debugging
    var imageInput = document.getElementById('image');
    if (imageInput.files && imageInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            if (e.target && e.target.result) {
                resumeData.image = e.target.result;
                generateResumePreview(resumeData);
            }
        };
        reader.readAsDataURL(imageInput.files[0]);
    }
    else {
        generateResumePreview(resumeData);
    }
}
function generateResumePreview(data) {
    var previewElement = document.getElementById('resume-preview');
    if (!previewElement) {
        console.error('Could not find resume-preview element.');
        return;
    }
    previewElement.innerHTML = "\n        <div>\n            ".concat(data.image ? "<img src=\"".concat(data.image, "\" alt=\"").concat(data.name, "'s Image\" />") : '', "\n            <h2 contenteditable=\"true\">").concat(data.name, "</h2>\n            <p><strong>Email:</strong> ").concat(data.email, "</p>\n            <p><strong>Phone:</strong> ").concat(data.phone, "</p>\n            <p><strong>Address:</strong> ").concat(data.address, "</p>\n            <h3>About Me</h3>\n            <p contenteditable=\"true\">").concat(data.summary, "</p>\n\n            <h3>Education</h3>\n            <p contenteditable=\"true\"><strong>Degree:</strong> ").concat(data.education.degree, "</p>\n            <p contenteditable=\"true\"><strong>Institute:</strong> ").concat(data.education.institute, "</p>\n            <p contenteditable=\"true\"><strong>Year:</strong> ").concat(data.education.year, "</p>\n\n            <h3>Experience</h3>\n            <p contenteditable=\"true\"><strong>Company:</strong> ").concat(data.experience.company, "</p>\n            <p contenteditable=\"true\"><strong>Designation:</strong> ").concat(data.experience.designation, "</p>\n            <p contenteditable=\"true\"><strong>Experience:</strong> ").concat(data.experience.experience, "</p>\n\n            <h3>Skills</h3>\n            <ul>\n                ").concat(data.skills.map(function (skill) { return "<li contenteditable=\"true\">".concat(skill, "</li>"); }).join(''), "\n            </ul>\n\n            <h3>Languages</h3>\n            <ul>\n                ").concat(data.languages.map(function (language) { return "<li contenteditable=\"true\">".concat(language, "</li>"); }).join(''), "\n            </ul>\n        </div>\n    ");
}
function initializeForm() {
    var form = document.getElementById('resume-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    else {
        console.error('Could not find resume-form element.');
    }
}
function initializeAdditionalFeatures() {
    var urlSearch = new URLSearchParams(window.location.search);
    var username = urlSearch.get('username') || 'Anonymous User';
    var shareLinkElement = document.getElementById('share-link');
    if (shareLinkElement) {
        shareLinkElement.value = window.location.href;
    }
    var copyLinkButton = document.getElementById('copy-link');
    if (copyLinkButton) {
        copyLinkButton.addEventListener('click', function () {
            navigator.clipboard.writeText(shareLinkElement.value)
                .then(function () { return alert("Link copied: ".concat(shareLinkElement.value)); })
                .catch(function (err) { return alert('Error copying link: ' + err); });
        });
    }
    var downloadPdfButton = document.getElementById('download-pdf');
    if (downloadPdfButton) {
        downloadPdfButton.addEventListener('click', function () {
            var resumeContainer = document.getElementById('resume-preview');
            if (resumeContainer) {
                html2pdf(resumeContainer).save("".concat(username, "-resume.pdf"));
            }
        });
    }
}
window.addEventListener('DOMContentLoaded', function () {
    initializeForm();
    initializeAdditionalFeatures();
});

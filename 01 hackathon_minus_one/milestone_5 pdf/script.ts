

interface ResumeData {
    name: string;
    email: string;
    phone: string;
    address: string;
    summary: string;
    skills: string[];
    education: {
        degree: string;
        institute: string;
        year: string;
    };
    experience: {
        company: string;
        designation: string;
        experience: string;
    };
    languages: string[];
    image?: string;
}

function handleFormSubmit(event: Event): void {
    event.preventDefault();
    
    const resumeData: ResumeData = {
        name: (document.getElementById('name') as HTMLInputElement).value.trim(),
        email: (document.getElementById('email') as HTMLInputElement).value.trim(),
        phone: (document.getElementById('phone') as HTMLInputElement).value.trim(),
        address: (document.getElementById('address') as HTMLInputElement).value.trim(),
        summary: (document.getElementById('summary') as HTMLTextAreaElement).value.trim(),
        skills: (document.getElementById('skills') as HTMLTextAreaElement).value.split(',').map(skill => skill.trim()),
        education: {
            degree: (document.getElementById('degreename') as HTMLInputElement).value.trim(),
            institute: (document.getElementById('institute') as HTMLInputElement).value.trim(),
            year: (document.getElementById('year') as HTMLInputElement).value.trim(),
        },
        experience: {
            company: (document.getElementById('company') as HTMLInputElement).value.trim(),
            designation: (document.getElementById('designation') as HTMLInputElement).value.trim(),
            experience: (document.getElementById('experience') as HTMLInputElement).value.trim(),
        },
        languages: (document.getElementById('languages') as HTMLTextAreaElement).value.split(',').map(lang => lang.trim()),
    };

    console.log('Form Data:', resumeData);  // Debugging

    const imageInput = document.getElementById('image') as HTMLInputElement;
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e: ProgressEvent<FileReader>) {
            if (e.target && e.target.result) {
                resumeData.image = e.target.result as string;
                generateResumePreview(resumeData);
            }
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        generateResumePreview(resumeData);
    }
}

function generateResumePreview(data: ResumeData): void {
    const previewElement = document.getElementById('resume-preview') as HTMLElement;
    if (!previewElement) {
        console.error('Could not find resume-preview element.');
        return;
    }

    previewElement.innerHTML = `
        <div>
            ${data.image ? `<img src="${data.image}" alt="${data.name}'s Image" />` : ''}
            <h2 contenteditable="true">${data.name}</h2>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Address:</strong> ${data.address}</p>
            <h3>About Me</h3>
            <p contenteditable="true">${data.summary}</p>

            <h3>Education</h3>
            <p contenteditable="true"><strong>Degree:</strong> ${data.education.degree}</p>
            <p contenteditable="true"><strong>Institute:</strong> ${data.education.institute}</p>
            <p contenteditable="true"><strong>Year:</strong> ${data.education.year}</p>

            <h3>Experience</h3>
            <p contenteditable="true"><strong>Company:</strong> ${data.experience.company}</p>
            <p contenteditable="true"><strong>Designation:</strong> ${data.experience.designation}</p>
            <p contenteditable="true"><strong>Experience:</strong> ${data.experience.experience}</p>

            <h3>Skills</h3>
            <ul>
                ${data.skills.map(skill => `<li contenteditable="true">${skill}</li>`).join('')}
            </ul>

            <h3>Languages</h3>
            <ul>
                ${data.languages.map(language => `<li contenteditable="true">${language}</li>`).join('')}
            </ul>
        </div>
    `;
}

function initializeForm(): void {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    } else {
        console.error('Could not find resume-form element.');
    }
}



function initializeAdditionalFeatures(): void {
    const urlSearch = new URLSearchParams(window.location.search);
    const username = urlSearch.get('username') || 'Anonymous User';

    const shareLinkElement = document.getElementById('share-link') as HTMLInputElement;
    if (shareLinkElement) {
        shareLinkElement.value = window.location.href;
    }

    const copyLinkButton = document.getElementById('copy-link') as HTMLElement;
    if (copyLinkButton) {
        copyLinkButton.addEventListener('click', () => {
            navigator.clipboard.writeText(shareLinkElement.value)
                .then(() => alert(`Link copied: ${shareLinkElement.value}`))
                .catch(err => alert('Error copying link: ' + err));
        });
    }

    const downloadPdfButton = document.getElementById('download-pdf') as HTMLElement;
    if (downloadPdfButton) {
        downloadPdfButton.addEventListener('click', () => {
            const resumeContainer = document.getElementById('resume-preview') as HTMLElement;
            if (resumeContainer) {
                html2pdf(resumeContainer).save(`${username}-resume.pdf`);
            }
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    initializeForm();
    initializeAdditionalFeatures();
});

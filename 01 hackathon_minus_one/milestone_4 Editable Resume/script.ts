// Define the interface for the resume data structure
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

// Function to handle form submission
function handleFormSubmit(event: Event): void {
    event.preventDefault();  // Prevent the default form submission behavior

    // Fetch the form data
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

    // Handle image upload if provided
    const imageInput = document.getElementById('image') as HTMLInputElement;
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e: ProgressEvent<FileReader>) {
            if (e.target && e.target.result) {
                resumeData.image = e.target.result as string;  // Assign the image to the resume data
                generateResumePreview(resumeData);
            }
        };
        reader.readAsDataURL(imageInput.files[0]);  // Convert the image to a data URL
    } else {
        // Generate resume preview without image
        generateResumePreview(resumeData);
    }
    
}



function generateResumePreview(data: ResumeData): void {
    const previewElement = document.getElementById('resume-preview') as HTMLElement;

    if (!previewElement) {
        console.error('Could not find resume-preview element.');
        return;
    }
    if(previewElement){
        previewElement.scrollIntoView({ behavior: 'smooth' });
    }

    // Dynamically generate the resume content with contenteditable
    previewElement.innerHTML = `
        <div>
        <section class="sec1">
        ${data.image ? `<img src="${data.image}" alt="${data.name}'s Image" />` : ''}
        <h2 contenteditable="true" id="editable-name">${data.name}</h2>
        
        <p id="top" contenteditable="true"><strong>Email:</strong> ${data.email}</p>
        <p id="top" contenteditable="true"><strong>Phone:</strong> ${data.phone}</p>
        <p id="top" contenteditable="true"><strong>Address:</strong> ${data.address}</p>
        <h3>About Me</h3>
        <p contenteditable="true" id="editable-summary">${data.summary}</p>

        </section>
        <section class="sec2">
        <h3>Education</h3>
        <p contenteditable="true" id="editable-degree"><strong>Degree:</strong> ${data.education.degree}</p>
        <p contenteditable="true" id="editable-institute"><strong>Institute:</strong> ${data.education.institute}</p>
        <p contenteditable="true" id="editable-year"><strong>Year:</strong> ${data.education.year}</p>

        <h3>Experience</h3>
        <p contenteditable="true" id="editable-company"><strong>Company:</strong> ${data.experience.company}</p>
        <p contenteditable="true" id="editable-designation"><strong>Designation:</strong> ${data.experience.designation}</p>
        <p contenteditable="true" id="editable-experience"><strong>Experience:</strong> ${data.experience.experience}</p>

        <h3>Skills</h3>
        <ul>
            ${data.skills.map((skill, index) => `
                <li contenteditable="true" id="editable-skill-${index}">${skill}</li>`).join('')}
        </ul>

        <h3>Languages</h3>
        <ul>
            ${data.languages.map((language, index) => `
                <li contenteditable="true" id="editable-language-${index}">${language}</li>`).join('')}
        </ul>
        </section>
        </div>
    `;

    addEditListeners(data);
}

// Function to initialize form event listeners
function initializeForm(): void {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    } else {
        console.error('Could not find resume-form element.');
    }
}

// Initialize form when the document is fully loaded
window.addEventListener('DOMContentLoaded', initializeForm);



// Add event listeners to each editable section
function addEditListeners(data: ResumeData) {
    // Name
    const nameElement = document.getElementById('editable-name') as HTMLElement;
    nameElement.addEventListener('input', () => {
        data.name = nameElement.textContent || '';
    });

    // Education - Degree, Institute, Year
    const degreeElement = document.getElementById('editable-degree') as HTMLElement;
    degreeElement.addEventListener('input', () => {
        data.education.degree = degreeElement.textContent || '';
    });

    const instituteElement = document.getElementById('editable-institute') as HTMLElement;
    instituteElement.addEventListener('input', () => {
        data.education.institute = instituteElement.textContent || '';
    });

    const yearElement = document.getElementById('editable-year') as HTMLElement;
    yearElement.addEventListener('input', () => {
        data.education.year = yearElement.textContent || '';
    });

    // Professional Experience - Company, Designation, Experience
    const companyElement = document.getElementById('editable-company') as HTMLElement;
    companyElement.addEventListener('input', () => {
        data.experience.company = companyElement.textContent || '';
    });

    const designationElement = document.getElementById('editable-designation') as HTMLElement;
    designationElement.addEventListener('input', () => {
        data.experience.designation = designationElement.textContent || '';
    });

    const experienceElement = document.getElementById('editable-experience') as HTMLElement;
    experienceElement.addEventListener('input', () => {
        data.experience.experience = experienceElement.textContent || '';
    });

    // Skills and Languages (dynamically added items)
    data.skills.forEach((_, index) => {
        const skillElement = document.getElementById(`editable-skill-${index}`) as HTMLElement;
        skillElement.addEventListener('input', () => {
            data.skills[index] = skillElement.textContent || '';
        });
    });

    data.languages.forEach((_, index) => {
        const langElement = document.getElementById(`editable-language-${index}`) as HTMLElement;
        langElement.addEventListener('input', () => {
            data.languages[index] = langElement.textContent || '';
        });
    });
}



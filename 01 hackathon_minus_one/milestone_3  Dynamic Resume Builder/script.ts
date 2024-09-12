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

// Function to generate and display the resume preview
function generateResumePreview(data: ResumeData): void {
    const previewElement = document.getElementById('resume-preview') as HTMLElement;

    if (!previewElement) {
        console.error('Could not find resume-preview element.');
        return;
    }

    if(previewElement){
        previewElement.scrollIntoView({ behavior: 'smooth' });
    }
    // Dynamically generate the resume content
    previewElement.innerHTML = `
        <div>
        <section class="sec1">
        ${data.image ? `<img src="${data.image}" alt="${data.name}'s Image" />` : ''}
        <h2>${data.name}</h2>
        
        <p id="top"><strong>Email:</strong> ${data.email}</p>
        <p id="top"><strong>Phone:</strong> ${data.phone}</p>
        <p id="top"><strong>Address:</strong> ${data.address}</p>
        <h3>About Me</h3>
        <p>${data.summary}</p>

        

        </section>
        <section class="sec2">
        <h3>Education</h3>
        <p><strong>Degree:</strong> ${data.education.degree}</p>
        <p><strong>Institute:</strong> ${data.education.institute}</p>
        <p><strong>Year:</strong> ${data.education.year}</p>
        <h3>Experience</h3>
        <p><strong>Company:</strong> ${data.experience.company}</p>
        <p><strong>Designation:</strong> ${data.experience.designation}</p>
        <p><strong>Experience:</strong> ${data.experience.experience}</p>
        <h3>Skills</h3>
        <ul>${data.skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
        <h3>Languages</h3>
        <ul>${data.languages.map(language => `<li>${language}</li>`).join('')}</ul>
        </section>
        </div>
        
    `;
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


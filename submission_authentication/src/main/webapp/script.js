/**
 * Function to validate file format and display corresponding error/success messages.
 */
function validateFile(inputId, errorId) {
    const input = document.getElementById(inputId);
    const errorSpan = document.getElementById(errorId);
    const allowedFormats = {
        'passportUpload': ['.jpg', '.png'],
        'diplomaUpload': ['.pdf'],
    };

    const fileName = input.value;
    const fileExtension = fileName.substring(fileName.lastIndexOf('.'));
    
    const languageSelect = document.getElementById('language');
    const selectedLanguage = languageSelect.value;
    const languages = {
        kinyarwanda: {
            invalidFileFormat: 'Icyangombwa sicyo. Hitamo impuzampapuro nyayo.',
            fileUploaded: 'Icyangombwa cyawe cyakiriwe neza.',
        },
        english: {
            invalidFileFormat: 'Invalid file format. Please select the correct format.',
            fileUploaded: 'File uploaded successfully',
        },
        french: {
            invalidFileFormat: 'Format de fichier invalide. Veuillez sélectionner le format correct.',
            fileUploaded: 'Fichier téléchargé avec succès',
        },
    };

    if (!allowedFormats[inputId].includes(fileExtension.toLowerCase())) {
        errorSpan.innerText = languages[selectedLanguage].invalidFileFormat;
        input.value = ''; // Clear the file input
        errorSpan.style.color = 'red';
    } else {
        errorSpan.innerText = languages[selectedLanguage].fileUploaded;
        errorSpan.style.color = 'green';
    }
}


/**
 * Function to validate the sign-up form.
 */
function validateSignUpForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+/;

    // Clear previous error messages
    document.getElementById('email-error').innerText = '';
    document.getElementById('password-error').innerText = '';

    const languageSelect = document.getElementById('language');
    const selectedLanguage = languageSelect.value;
    const languages = {
        kinyarwanda: {
            invalidEmail: 'Shyiramo email yemewe',
            passwordLength: 'Ijambo banga rigizwe nibura ninyuguti 8',
        },
        english: {
            invalidEmail: 'Invalid email format',
            passwordLength: 'Password must be at least 8 characters',
        },
        french: {
            invalidEmail: 'Format d\'email invalide',
            passwordLength: 'Le mot de passe doit comporter au moins 8 caractères',
        },
    };

    if (!emailRegex.test(email)) {
        document.getElementById('email-error').innerText = languages[selectedLanguage].invalidEmail;
        return false;
    }

    if (password.length < 8) {
        document.getElementById('password-error').innerText = languages[selectedLanguage].passwordLength;
        return false;
    }

    return true;
}

/**
 * Function to validate the submission form.
 */
function validateSubmissionForm() {
    const passportUpload = document.getElementById('passportUpload').value;
    const diplomaUpload = document.getElementById('diplomaUpload').value;
    
    // Clear previous error messages
    document.getElementById('passport-error').innerText = '';
    document.getElementById('diploma-error').innerText = '';

    const languageSelect = document.getElementById('language');
    const selectedLanguage = languageSelect.value;
    const languages = {
        kinyarwanda: {
            invalidFileFormat: 'Icyangombwa sicyo. Hitamo impuzampapuro nyayo.',
            fileUploaded: 'Icyangombwa cyawe cyakiriwe neza.',
        },
        english: {
            invalidFileFormat: 'Invalid file format. Please select the correct format.',
            fileUploaded: 'File uploaded successfully',
        },
        french: {
            invalidFileFormat: 'Format de fichier invalide. Veuillez sélectionner le format correct.',
            fileUploaded: 'Fichier téléchargé avec succès',
        },
    };

    const passportFileName = passportUpload.substring(passportUpload.lastIndexOf('\\') + 1);
    const diplomaFileName = diplomaUpload.substring(diplomaUpload.lastIndexOf('\\') + 1);

    const allowedPassportFormats = ['.jpg', '.png'];
    const allowedDiplomaFormats = ['.pdf'];

    const passportFileExtension = passportFileName.substring(passportFileName.lastIndexOf('.')).toLowerCase();
    const diplomaFileExtension = diplomaFileName.substring(diplomaFileName.lastIndexOf('.')).toLowerCase();

    if (!allowedPassportFormats.includes(passportFileExtension)) {
        document.getElementById('passport-error').innerText = languages[selectedLanguage].invalidFileFormat;
        return false;
    }

    if (!allowedDiplomaFormats.includes(diplomaFileExtension)) {
        document.getElementById('diploma-error').innerText = languages[selectedLanguage].invalidFileFormat;
        return false;
    }

    return true;
}



/**
 * Function to change the language of the sign-up form.
 */
function changeIndexLanguage() {
    const languageSelect = document.getElementById('language');
    const selectedLanguage = languageSelect.value;

    // Define language-specific content
    const languages = {
        kinyarwanda: {
            formTitle: 'Form y\'umunyeshuli',
            emailLabel: 'Imeyili',
            emailPlaceholder: 'izina@example.com',
            passwordLabel: 'Ijambo banga',
            passwordPlaceholder: 'ijambo banga',
            submitButton: 'Emeza',
            // ... (other language-specific content)
        },
        english: {
            formTitle: 'Student Sign-Up Form',
            emailLabel: 'Email',
            emailPlaceholder: 'student@example.com',
            passwordLabel: 'Password',
            passwordPlaceholder: 'password',
            submitButton: 'Sign Up',
            // ... (other language-specific content)
        },
        french: {
            formTitle: 'Formulaire d\'étudiante',
            emailLabel: 'E-mail',
            emailPlaceholder: 'etudiant@example.com',
            passwordLabel: 'Mot de passe',
            passwordPlaceholder: 'mot de passe',
            submitButton: 'S\'inscrire',
            // ... (other language-specific content)
        },
    };

    // Update the form title, email label, password label, and signup button text
    document.querySelector('.container h1').textContent = languages[selectedLanguage].formTitle;
    document.querySelector('label[for="email"]').textContent = languages[selectedLanguage].emailLabel;
    document.getElementById('email').placeholder = languages[selectedLanguage].emailPlaceholder;

    // Update the password label and placeholder
    document.querySelector('label[for="password"]').textContent = languages[selectedLanguage].passwordLabel;
    document.getElementById('password').placeholder = languages[selectedLanguage].passwordPlaceholder;

    // Update the signup button text
    document.querySelector('button[name="submit"]').textContent = languages[selectedLanguage].submitButton;

    // ... (update other elements as needed)
}


/**
 * Function to change the language of the submission form.
 */
function changeSubmissionLanguage() {
    const languageSelect = document.getElementById('language');
    const selectedLanguage = languageSelect.value;
    const languages = {
        kinyarwanda: {
            formTitle: 'Imyirondoro y\'umunyeshuli',
            passportLabel: 'Akarita ndangamuntu (.jpg cyangwa .png)',
            diplomaLabel: 'Dipolome yumunyeshuli (.pdf)',
            submitButton: 'Emeza',
            invalidFileFormat: 'Icyangombwa sicyo. Hitamo impuzampapuro nyayo.',
            fileUploaded: 'Icyangombwa cyawe cyakiriwe neza.',
            chooseFile: 'Hitamo Icyangombwa',
        },
        english: {
            formTitle: 'Student Submission Form',
            passportLabel: 'Upload Student Passport (.jpg or .png)',
            diplomaLabel: 'Upload Student Diploma (.pdf)',
            submitButton: 'Submit',
            invalidFileFormat: 'Invalid file format. Please select the correct format.',
            fileUploaded: 'File uploaded successfully',
            chooseFile: 'Choose File',
        },
        french: {
            formTitle: 'Formulaire de Soumission',
            passportLabel: 'Télécharger le passeport (.jpg ou .png)',
            diplomaLabel: 'Télécharger le diplôme (.pdf)',
            submitButton: 'Soumettre',
            invalidFileFormat: 'Format de fichier invalide. Veuillez sélectionner le format correct.',
            fileUploaded: 'Fichier téléchargé avec succès',
            chooseFile: 'Choisir un fichier',
        },
    };

    // Update the form title and other elements specific to the submission form
    document.querySelector('.container h1').textContent = languages[selectedLanguage].formTitle;
    document.querySelector('label[for="passportUpload"]').textContent = languages[selectedLanguage].passportLabel;
    document.querySelector('label[for="diplomaUpload"]').textContent = languages[selectedLanguage].diplomaLabel;
    document.querySelector('button[name="submitButton"]').textContent = languages[selectedLanguage].submitButton;
    document.querySelector('input[type="file"]').nextElementSibling.textContent = languages[selectedLanguage].chooseFile;

    // Clear error messages
    document.getElementById('passport-error').textContent = '';
    document.getElementById('diploma-error').textContent = '';
}

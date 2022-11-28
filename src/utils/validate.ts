const emailRegEp = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

const validateRegister = (
    email: string,
    password: string,
    confirmPassword: string
) => {
    const emailError = validateEmail(email);
    const passwordError = validatePasswords(password, confirmPassword);
    return {
        email: emailError,
        password: passwordError
    }
}

const validateLogin = (
    email: string,
    password: string
) => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    return {
        email: emailError,
        password: passwordError
    }
}

const validateEmail = (email: string) => {
    if (email.trim() === '') {
        return  'Email is required';
    }

    if (!email.match(emailRegEp)) {
        return 'Email should be a valid email address';
    }

    return '';
}

const validatePassword = (
    password: string
) => {
    if (password.trim() === '') {
        return 'Password cannot be empty';
    }

    return '';
}

const validatePasswords = (
    password: string,
    confirmPassword: string
) => {
    if (password.trim() === '') {
        return 'Password cannot be empty';
    }

    if (password.length < 8) {
        return 'Password should be at least 8 characters long';
    }

    if (password !== confirmPassword) {
        return 'Passwords should match';
    }

    return '';
}

module.exports = { validateRegister, validateLogin };

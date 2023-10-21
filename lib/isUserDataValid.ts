interface userDataProps {
    name?: string;
    surname?: string;
    password?: string;
    email?: string;
}

export interface errors {
    name?: {
        error?: string;
        isValid: boolean;
    };
    surname?: {
        error?: string;
        isValid: boolean;
    };
    email?: {
        error?: string;
        isValid: boolean;
    };
    password?: {
        error?: string;
        isValid: boolean;
        errors: {
            length: boolean;
            number: boolean;
        };
    };

    hasErrors: boolean;
}

export function validateUserData(userData: userDataProps) {
    const { name, surname, password, email } = userData;

    const errors: errors = {
        hasErrors: false,
    };

    if (name != undefined) errors.name = validateName(name);
    if (surname != undefined) errors.surname = validateSurname(surname);
    if (email != undefined) errors.email = validateEmail(email);
    if (password != undefined) errors.password = validatePassword(password);

    errors.hasErrors = Object.values(errors).some((value) => value.isValid == false);

    return errors;
}

export function validateEmail(email: string) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;

    return {
        error: "Nie prawidłowy email. Spróbuj jeszcze raz",
        isValid: regex.test(email),
    };
}

export function validateName(name: string) {
    return {
        error: "Niestety, pole musi się składać z 2-20 znaków",
        isValid: name.trim().length >= 2 && name.trim().length <= 20,
    };
}

export function validateSurname(surname: string) {
    return {
        error: "Niestety, pole musi się składać z 2-20 znaków",
        isValid: surname.trim().length >= 2 && surname.trim().length <= 20,
    };
}

export function validatePassword(password: string) {
    const errors = {
        length: false,
        number: false,
    };

    if (password.trim().length < 8) errors.length = true;
    if (!/\d/.test(password)) errors.number = true;

    return {
        error: errors.length ? "Hasło musi zawierać minimum 8 znaków" : "Hasło musi zawierac cyfry",
        isValid: !Object.values(errors).includes(true),
        errors,
    };
}

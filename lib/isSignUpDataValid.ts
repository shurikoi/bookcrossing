interface SignUpData {
    name: string;
    surname: string;
    password: string;
}

export default function isSignUpDataValid(SignUpData: SignUpData) {
    const { name, surname, password } = SignUpData;

    const errors = {
        name: false,
        surname: false,
        password: {
            length: false,
            number: false,
        },
        hasErrors: false,
    };

    errors.name = checkName(name);
    errors.surname = checkSurname(surname);
    errors.password = checkPassword(password);

    if (Object.values(errors).includes(true)) errors.hasErrors = true;

    return errors;
}

export function checkName(name: string) {
    return name.trim().length < 2 || name.trim().length > 55;
}

export function checkSurname(surname: string) {
    return surname.trim().length < 2 || surname.trim().length > 55;
}

export function checkPassword(password: string) {
    let error = {
        length: false,
        number: false,
        hasErrors: false,
    };

    if (password.trim().length <= 8) error.length = true;
    if (!/\d/.test(password)) error.number = true;

    if (Object.values(error).includes(true)) error.hasErrors = true;
    
    return error;
}

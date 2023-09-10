interface SignUpData{
    name: string,
    surname: string,
    password: string,
}


export default function isSignUpDataValid(SignUpData: SignUpData) {
    const { name, surname, password } = SignUpData;

    const errors = {
        name: false,
        surname: false,
        password: false,
        hasErrors: false,
    };

    if (name.trim().length < 2 || name.trim().length > 55) errors.name = true;
    if (surname.trim().length < 2 || surname.trim().length > 55) errors.surname = true;

    Object.values(errors).forEach((error) => {
        if (error) {
            errors.hasErrors = true;
        }
    });

    return errors;
}

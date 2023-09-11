interface SignUpData {
    name: string
    surname: string
    password: string
}

export default function isSignUpDataValid(SignUpData: SignUpData) {
    const { name, surname, password } = SignUpData

    const errors = {
        name: false,
        surname: false,
        password: {
            length: false,
            number: false,
        },
        hasErrors: false,
    }

    if (name.trim().length < 2 || name.trim().length > 55) {
        errors.name = true
        errors.hasErrors = true
    }
    if (surname.trim().length < 2 || surname.trim().length > 55) {
        errors.surname = true
        errors.hasErrors = true
    }
    if (password.trim().length <= 8) {
        errors.password.length = true
        errors.hasErrors = true
    }
    if (!(/\d/.test(password))) {
        errors.password.number = true
        errors.hasErrors = true
    }

    console.log(errors)

    return errors
}

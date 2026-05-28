export const registerValidationRules = {
    name: {
        required: "Name is required!",
        minLength: {
            value: 3,
            message: 'Must be at least 3 characters'
        },
    },
    username: {
        required: "Username is required!",
        minLength: {
            value: 3,
            message: 'Must be at least 3 characters'
        },
    },
    mobile: {
        required: "Mobile no. is required!",
        minLength: {
            value: 10,
            message: 'Must be 10 characters'
        },
        maxLength: {
            value: 10,
            message: 'Must be 10 characters'
        },
    },
    email: {
        required: "Email is required!",
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid Email-id !'
        }
    },
    password: {
        required: "Password is required!",
        pattern: {
            value: /^.{8,}$/,
            message: 'Password must be 8 character long!'
        }
    }
}
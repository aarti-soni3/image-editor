export const getRegisterValidationRules = (watch) => ({
    name: {
        required: "Name is required!",
        minLength: {
            value: 3,
            message: 'Must be at least 3 characters'
        },
        maxLength: {
            value: 20,
            message: 'Must be less than 20 characters'
        },
    },
    username: {
        required: "Username is required!",
        minLength: {
            value: 3,
            message: 'Must be at least 3 characters'
        },
        maxLength: {
            value: 20,
            message: 'Must be less than 20 characters'
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
        },
        maxLength: {
            value: 30,
            message: 'Must be less than 30 characters'
        },
    },
    cpassword: {
        required: "Confirm Password is required!",
        pattern: {
            value: /^.{8,}$/,
            message: 'Password must be 8 character long!'
        },
        maxLength: {
            value: 30,
            message: 'Must be less than 30 characters'
        },
        validate: (value) => {
            return value === watch('password') || `Password & confirm password must be equal!`
        }
    }
})

export const validateImageResolution = (file) => {

    const minHeight = 400;
    const minWidth = 400;
    const maxHeight = 768;
    const maxWidth = 1024;

    return new Promise((resolve) => {
        if (!file || !(file instanceof File)) {
            resolve(true)
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = () => {
                if (img.width < minWidth || img.height < minHeight || img.width > maxWidth || img.height > maxHeight)
                    resolve(`Image must be at least ${minWidth} * ${minHeight} & not exceeding ${maxWidth} * ${maxHeight}`);
                else
                    resolve(true)
            }
            img.onerror = () => resolve('Invalid image file...!')
        }
    })
}

export const fileValidation = {
    image: {
        required: 'Image is required',
        lessThan2MB: (files) => {
            files?.[0]?.size < 2000000 || 'File must be less than 2MB'
        },
        acceptedFormats: (files) => {
            ['image/jpeg', 'image/jpg'].includes(files?.[0]?.type) || 'Only JPEG, JPG, PNG files are allowed!'
        },
        validate: async (files) => {
            const file = files?.[0];
            return await validateImageResolution(file);
        }
    }
}
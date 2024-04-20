export const userCanSignUp = async(userData, confirmPassword) => {
    if(userData.password !== confirmPassword) {
        return {
            success: false,
            message: "Passwords do not match"
        };
    }
    if(userData.password.length < 8) {
        return {
            success: false,
            message: "Password must be at least 8 characters"
        };
    }
    if(userData.phone.length !== 12 || !userData.phone.match(/\d{12}/)) {
        return {
            success: false,
            message: "Invalid phone number"
        };
    }
    if(!userData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        return {
            success: false,
            message: "Invalid email"
        };
    }
    if(!userData.name || userData.name.length < 2) {
        return {
            success: false,
            message: "Invalid name"
        };
    }
    
    return {
        success: true, 
        message: "User can be created"
    };
}


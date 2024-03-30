const users = [
    {
        "name": "Alice Johnson",
        "email": "alice.johnson@example.com",
        "phone": "123-456-7890",
        "password": "password123"
    },
    {
        "name": "Bob Smith",
        "email": "bob.smith@example.com",
        "phone": "987-654-3210",
        "password": "securepass321"
    },
    {
        "name": "Charlie Brown",
        "email": "charlie.brown@example.com",
        "phone": "555-555-5555",
        "password": "charlie123"
    },
    {
        "name": "Diana Ross",
        "email": "diana.ross@example.com",
        "phone": "222-333-4444",
        "password": "dianaR2024"
    },
    {
        "name": "Eva Martinez",
        "email": "eva.martinez@example.com",
        "phone": "777-888-9999",
        "password": "ev@123"
    },
    {
        "name": "Franklin Rodriguez",
        "email": "franklin.rodriguez@example.com",
        "phone": "666-777-8888",
        "password": "franklin2024"
    },
    {
        "name": "Grace Lee",
        "email": "grace.lee@example.com",
        "phone": "333-222-1111",
        "password": "grace1234"
    },
    {
        "name": "Henry Wang",
        "email": "henry.wang@example.com",
        "phone": "999-999-9999",
        "password": "henryWang!@#"
    },
    {
        "name": "Ivy Patel",
        "email": "ivy.patel@example.com",
        "phone": "444-444-4444",
        "password": "ivyIvyIvy"
    },
    {
        "name": "Jackie Chan",
        "email": "jackie.chan@example.com",
        "phone": "123-123-1234",
        "password": "kungfu123"
    }
];

export const readUserData = async () => {
    return users;
};

export const writeUserData = async (userData) => {
    users.push(userData);
};

export const userCanSignUp = async(userData, confirmPassword) => {
    if(users.find(user => user.email === userData.email) || users.find(user => user.phone === userData.phone)) {
        return {
            success: false,
            message: "User already exists"
        };
    }
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

    users.push(userData);
    
    return {
        success: true, 
        message: "User created successfully"
    };
}

export const userExists = async (email, password) => {
    const user = users.find(user => user.email === email && user.password === password);
    return user !== undefined && user !== null;
}

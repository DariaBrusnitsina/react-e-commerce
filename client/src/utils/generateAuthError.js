function generateAuthError(message) {
    switch (message) {
        case "INVALID PASSWORD":
            return "Password is incorrect";
        case "EMAIL NOT FOUND":
            return "Email address not found";
        case "EMAIL EXISTS":
            return "A user with that email address already exists";
        default:
            return "An unknown error occurred. Please try again.";
    }
}

export default generateAuthError;

module.exports.validateRegisterInputs = (
    username,
    password,
    confirmPassword,
    email
) => {
    console.log(username,
        password,
        confirmPassword,
        email);
    const validationResult = username.trim() === '' ? 'username invalid' :
        email.trim() === '' ? 'email invalid' :
        !email.match('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$') ? 'email not correct' :
        password === '' ? 'password invalid' :
        confirmPassword === '' ? 'confirmPassword invalid' :
        password !== confirmPassword ? 'password and confirmpassword do not match' :
        'valid'
    return validationResult === 'valid' ? { valid: true, validationResult: validationResult } : { valid: false, validationResult: validationResult }
}

module.exports.validateRegisterInputs = (
    username,
    password
) => {

    const validationResult = username.trim() === '' ? 'username invalid' :
        password === '' ? 'password invalid' :
        'valid'
    return validationResult === 'valid' ? { valid: true, validationResult: validationResult } : { valid: false, validationResult: validationResult }
}
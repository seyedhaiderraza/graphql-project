module.exports.validateRegisterInputs = (
    username,
    password,
    confirmPassword,
    email
) => {
    const validationResult=[]

    username.trim() === '' ? validationResult.push('username invalid') :false
    email.trim() === '' ? validationResult.push('email invalid') :
     !email.match('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$') ? validationResult.push('email not correct') :false
     password === '' ? validationResult.push('password invalid') :false
      confirmPassword === '' ? validationResult.push('confirmPassword invalid') :false
      password !== confirmPassword ? validationResult.push('Password and confirmPassword do not match') :null
    
    if(validationResult.length===0)
    validationResult.push('valid')
        
        console.log(validationResult)
    return validationResult === 'valid' ? { valid: true, validationResult: validationResult } : { valid: false, validationResult: validationResult }
}

module.exports.validateLoginInputs = (
    username,
    password
) => {
    const validationResult=[]
    username.trim() === '' ? validationResult.push('username invalid') :false
        password === '' ? validationResult.push('password invalid') :false
        if(validationResult.length===0)
    validationResult.push('valid')
    return validationResult === 'valid' ? { valid: true, validationResult: validationResult } : { valid: false, validationResult: validationResult }
}
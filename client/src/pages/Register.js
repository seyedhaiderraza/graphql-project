import { gql } from 'graphql-tag'
import React, { useState } from 'react'
import {Form, Button} from 'semantic-ui-react'
import {useMutation} from '@apollo/client'
function Register() {
  const [values, setValues] = useState({
    username:'',
    password:'',
    confirmPassword:'',
    email:''
  })
  const [errors, setErrors] = useState({})
  const onChangeHandler = (event)=>{
    setValues({...values, [event.target.name]: event.target.value})
  }

  const [addUser, {loading}] = useMutation(REGISTER_USER_MUTATION,{
    update(proxy, result){
      console.log(result);
    },onError(err){
      console.log(err.graphQLErrors);
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    variables:{
      username:values.username,
      password:values.password,
      confirmPassword:values.confirmPassword,
      email:values.email}
    })
  
  const performSubmit=(e)=>{
    e.preventDefault() //prevent refresh of form on submit
    addUser()
  }
  
  return (
    <div>
    <Form onSubmit={performSubmit} className={loading? "loading":''} noValidate
     style={{width:'400px', margin:'auto'}}>
      <h1>Register</h1>
      <Form.Input
        label="username"
        name="username"
        placeholder="Username..."
        type="text"
        values={values.username}
        onChange={onChangeHandler}
      />
      <Form.Input
        label="email"
        name="email"
        placeholder="Email..."
        type="email"
        values={values.email}
        onChange={onChangeHandler}
      />
      <Form.Input
        label="password"
        name="password"
        placeholder="Password..."
        type="password"
        values={values.password}
        onChange={onChangeHandler}
      />
      <Form.Input
        label="confirm Password"
        name="confirmPassword"
        placeholder="confirm Password..."
        type="password"
        values={values.confirmPassword}
        onChange={onChangeHandler}
      />
      <Button type="submit" primary>Register</Button>
      
    </Form>
    {errors && Object.keys(errors).length>0 &&(<div className="ui error message">
      <ul className="list">
        {Object.values(errors.validationResult).map(value=>(
          <li key={value}>{value}</li>
        ))}
      </ul>
    </div>)}
    
      </div>
  )
}

const REGISTER_USER_MUTATION = gql`
mutation registerUser
($username:String!, $email: String!, $password:String!, $confirmPassword: String!){
  registerUser(
     registerUserInput:
      { username:$username, email:$email, password:$password, confirmPassword:$confirmPassword }
          ){
            id createdAt username token
  }

}
`
export default Register

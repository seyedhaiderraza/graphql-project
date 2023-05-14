import { gql } from 'graphql-tag'
import React, { useState } from 'react'
import {Form, Button} from 'semantic-ui-react'
import {useMutation} from '@apollo/client'
import useForm from '../components/useForm'
function Register(props) {
  const initialState={
    username:'',
    password:'',
    confirmPassword:'',
    email:''
  }
  const [errors, setErrors] = useState({})
 
  
  const {onChangeHandler, performSubmit, values} = useForm(callAddUser,initialState)
  

  const [addUser, {loading}] = useMutation(REGISTER_USER_MUTATION,{
    update(proxy, result){

      props.history.push("/")
    },onError(err){
     
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    variables:{
      username: values.username,
      password: values.password,
      confirmPassword:values.confirmPassword,
      email: values.email}
    })
  
  function callAddUser(){
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
        value={values.username}
       error={errors?.validationResult?.username? true:false}
        onChange={onChangeHandler}
      />
      <Form.Input
        label="email"
        name="email"
        placeholder="Email..."
        type="email"
        value={values.email}
        
       error={errors?.validationResult?.email? true:false}
        onChange={onChangeHandler}
      />
      <Form.Input
        label="password"
        name="password"
        placeholder="Password..."
        type="password"
        
        value={values.password}
        
        error={errors?.validationResult?.password? true:false}
        onChange={onChangeHandler}
      />
      <Form.Input
        label="confirm Password"
        name="confirmPassword"
        placeholder="confirm Password..."
        type="password"
       
        value={values.confirmPassword}
        
        error={errors?.validationResult?.confirmPassword? true:false}
        onChange={onChangeHandler}
      />
      <Button type="submit" primary>Register</Button>
      
    </Form>
    {errors && Object.keys(errors).length>0 &&(<div className="ui error message">
      <ul className="list">
        {Object.keys(errors.validationResult).map(key=>(
          <li key={key}>{key}: {errors.validationResult[key]}</li>
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

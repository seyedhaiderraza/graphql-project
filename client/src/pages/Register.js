import { gql } from 'graphql-tag'
import React, { useContext, useState } from 'react'
import {Form, Button} from 'semantic-ui-react'
import {useMutation} from '@apollo/client'
import useForm from '../components/useForm'
import { AuthContext } from '../context/Auth'
import { useNavigate } from 'react-router-dom'
function Register(props) {
  const navigate = useNavigate()
  const context = useContext(AuthContext)
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
console.log(result);
context.login(result.data.registerUser)
      navigate('/')
    },onError(err){
     
      setErrors(err?.graphQLErrors[0]?.extensions?.errors)
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
  const handleLogout = () => {
    context.logout();
    navigate('/register')
  };
  const registerPage = context.user? (
    <div>
    <h1>You are already loggedin!</h1><br/>
    <h3>Click here to logout </h3> <Button color='teal' onClick={handleLogout}>Click here to logout</Button>
  </div>
  ):
 (
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
  return registerPage
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

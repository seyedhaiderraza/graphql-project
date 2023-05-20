import { gql } from 'graphql-tag'
import React, { useContext, useState } from 'react'
import {Form, Button} from 'semantic-ui-react'
import {useMutation} from '@apollo/client'
import { AuthContext } from '../context/Auth';
import useForm from '../components/useForm'
import {useNavigate} from 'react-router-dom'
function Login(props) {
  const navigate = useNavigate()
  const context = useContext(AuthContext)
  const initialState={
    username:'',
    password:''
  }
  const [errors, setErrors] = useState({})
 
  
  const {onChangeHandler, performSubmit, values} = useForm(callLoginUser,initialState)
  

  const [loginUser, {loading}] = useMutation(LOGIN_USER_MUTATION,{
    update(proxy, result){
      console.log(result.data.loginUser);
     
        context.login(result.data.loginUser)
        console.log(context.user);
        navigate("/")
      
    
    },onError(err){
      console.log('login user error',err?.graphQLErrors[0]?.extensions?.errors)
      setErrors(err?.graphQLErrors[0]?.extensions?.errors)
    },
    variables:{
      username: values.username,
      password: values.password}
    })
  
  function callLoginUser(){
    loginUser()
  }
  const handleLogout = () => {
    context.logout();
    navigate('/login')
  };
  const loginPage = context.user? (
  <div>
    <h1>You are already loggedin!</h1><br/>
    <h3>Click here to logout </h3>
    <Button color='teal' onClick={handleLogout}>Click here to logout</Button>
  </div>
  ):(
    <div>
    <Form onSubmit={performSubmit} className={loading? "loading":''} noValidate
     style={{width:'400px', margin:'auto'}}>
      <h1>Login</h1>
      <Form.Input
        label="username"
        name="username"
        placeholder="Username..."
        type="text"
        value={values.username}
       error={errors?.username? true:false}
        onChange={onChangeHandler}
      />
      <Form.Input
        label="password"
        name="password"
        placeholder="Password..."
        type="password"
        
        value={values.password}
        
        error={errors?.password? true:false}
        onChange={onChangeHandler}
      />
      <Button type="submit" primary>Login</Button>
      
    </Form>
    {errors && Object.keys(errors).length>0 &&(
      <div className="ui error message">
      <ul>
        {Object.keys(errors).map(key=>(
          <li key={key}>{key}: {errors[key]}</li>
        ))}
      </ul>
    </div>)}
    
      </div>
  )
  return loginPage 
}

const LOGIN_USER_MUTATION = gql`
mutation loginUser
($username:String! $password:String!){
  loginUser(username:$username,password:$password ){
            id createdAt username token
  }

}
`
export default Login

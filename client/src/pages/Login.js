import { gql } from 'graphql-tag'
import React, { useState } from 'react'
import {Form, Button} from 'semantic-ui-react'
import {useMutation} from '@apollo/client'
import useForm from '../components/useForm'
function Login(props) {
  const initialState={
    username:'',
    password:''
  }
  const [errors, setErrors] = useState({})
 
  
  const {onChangeHandler, performSubmit, values} = useForm(callLoginUser,initialState)
  

  const [loginUser, {loading}] = useMutation(LOGIN_USER_MUTATION,{
    update(proxy, result){
      props.history.push("/")
    },onError(err){
      setErrors(err?.graphQLErrors[0]?.extensions?.code)
    },
    variables:{
      username: values.username,
      password: values.password}
    })
  
  function callLoginUser(){
    loginUser()
  }
  return (
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
       error={errors?.validationResult?.username? true:false}
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
      <Button type="submit" primary>Login</Button>
      
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

const LOGIN_USER_MUTATION = gql`
mutation loginUser
($username:String! $password:String!){
  loginUser(username:$username,password:$password ){
            id createdAt username token
  }

}
`
export default Login

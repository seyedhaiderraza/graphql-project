import React, { useState } from 'react'
import {Button, Form} from 'semantic-ui-react'
import useForm from './useForm'
import { useMutation } from '@apollo/client'
import { CREATE_POST_MUTATION } from '../util/Query'
import { FETCH_ALL_POSTS_QUERY } from '../util/Query'
import gql from 'graphql-tag'
function CreatePostForm() {
    const {values, onChangeHandler,performSubmit} = useForm(createPostCallback, {body:''})
const [error, setError]= useState(null)
    const [createPost]= useMutation(CREATE_POST_MUTATION,{
        update(proxy,result){
           
                console.log('New Post created:', result?.data?.createPost);
           let data = proxy.readQuery({query:FETCH_ALL_POSTS_QUERY})
//data.getPosts= assignment not works error: getposts readonly so below works needed
           data = {getPosts:[result?.data?.createPost,...data.getPosts]}
          proxy.writeQuery({query:FETCH_ALL_POSTS_QUERY,data})
          values.body=''
          setError(null)
          //without this seterror if post body empty erro shown ,then if post body not empty posted still the red highlight of error keeps showing
              },
              variables: 
                {body:values.body}
           , onError(err){
            setError(err)
           }
        
        
    })
    console.log('{error}-----here-----',error?.graphQLErrors[0]);
    function createPostCallback(){
        createPost()
    }
  return (
    <>
    <Form  onSubmit={performSubmit}>
    <h2>Create a post:</h2>
    <Form.Field>
        <Form.Input placeholder="Enter a new post"
         name="body"
         value={values.body}
         onChange={onChangeHandler}
         error={error? true: false}
         />
<Button type="submit" color="teal">Post</Button>
      
    </Form.Field>
    </Form>
    {error && (
     <div className='ui error message' style={{marginBottom:"20px"}}>
      <ul>
      <li>{error?.graphQLErrors[0]?.message}</li>
      </ul>
    </div>)}
    </>
  )
}


export default CreatePostForm

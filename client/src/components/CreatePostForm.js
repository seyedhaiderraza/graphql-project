import React from 'react'
import {Button, Form} from 'semantic-ui-react'
import useForm from './useForm'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
function CreatePostForm() {
    const {values, onChangeHandler,performSubmit} = useForm(createPostCallback, {body:''})

    const [createPost,{error}]= useMutation(CREATE_POST_MUTATION,{
        update(_,result){
           
                console.log('New Post created:', result?.data?.createPost);
              },
              variables: 
                {body:values.body}
            
        
        
    })
    function createPostCallback(){
        createPost()
    }
  return (
    <Form  onSubmit={performSubmit}>
    <h2>Create a post:</h2>
    <Form.Field>
        <Form.Input placeholder="Enter a new post"
         name="body"
         value={values.body}
         onChange={onChangeHandler}
         />
<Button type="submit" color="teal">Post</Button>
      
    </Form.Field>
    </Form>
  )
}

const CREATE_POST_MUTATION = gql`
mutation CreatePost($body: String!) {
    createPost(body: $body) {
      body
      commentCount
      comments {
        body
        createdAt
        id
        username
      }
      createdAt
      id
      likeCount
      username
      likes {
        createdAt
        id
        username
      }
    }
  }
`
export default CreatePostForm

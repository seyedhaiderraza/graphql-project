import React from 'react'
import { Button, Icon, Popup } from 'semantic-ui-react'
import { DELETE_COMMENT_MUTATION, DELETE_POST_MUTATION, FETCH_ALL_POSTS_QUERY } from '../util/Query'
import { useMutation } from '@apollo/client'

const DeleteComponent = (props) => {
    const mutation = props.commentId? DELETE_COMMENT_MUTATION:DELETE_POST_MUTATION
    
    const values= props.commentId?
    {postId:props.postId, commentId:props.commentId}
    :{postId:props.postId}
    const [deletePostOrComment] = useMutation(mutation,{
       
        variables:values,
        refetchQueries: [{ query: FETCH_ALL_POSTS_QUERY }],//updates apolloclient cache 
    
})
  return ( <Popup inverted content={values.commentId?'delete comment':'delete post'} trigger={
    <Button  labelPosition='right' floated='right' onClick={deletePostOrComment}>
        <Button color='grey' basic={false}>
        <Icon name='trash' style={{margin:0}}/>
        </Button>
    </Button> }/>
  )
}

export default DeleteComponent

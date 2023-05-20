import React, { useContext } from 'react'
import { Button, Icon, Label } from 'semantic-ui-react'
import { AuthContext } from '../context/Auth'
import { Link } from 'react-router-dom'
import { LIKE_POST_MUTATION } from '../util/Query'
import { useMutation } from '@apollo/client'
const LikeComponent = ({user,post:{id, likes, likeCount}}) => {
  //if user logged in => if user liked any post then show post.likefilled
//if user not logged in=> show outline likebutton + link to login page
    
    
    const [likePost] = useMutation(LIKE_POST_MUTATION,
        {
            variables:{postId:id}
        })

    const likeButtonComponent = 
        user? (
        
    <Button as='div' labelPosition='right' onClick={likePost}>
    <Button color='red' 
    basic={likes.find(like=>like.username===user.username)?false:true}>
        <Icon name='heart' />
    </Button>
     <Label as='a' basic color='teal' pointing='left'>
        {likeCount}
     </Label>
     </Button>
        
        ):
        (
     <Button as='div' labelPosition='right' onClick={likePost}>
      <Button color='red' 
       basic={true} as={Link} to={`/login`}>
        <Icon name='heart' />
       </Button>
         <Label as='a' basic color='teal' pointing='left'>
          {likeCount}
         </Label>
        </Button>
    
        )
    
  return (
    likeButtonComponent
  )
}

export default LikeComponent

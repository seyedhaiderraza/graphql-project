import React, { useContext, useEffect, useState } from 'react'
import { Button, Icon, Label, Popup } from 'semantic-ui-react'
import { AuthContext } from '../context/Auth'
import { Link } from 'react-router-dom'
import { LIKE_POST_MUTATION } from '../util/Query'
import { useMutation } from '@apollo/client'
const LikeComponent = ({post:{id, likes, likeCount}}) => {
  //if user logged in => if user liked any post then show post.likefilled
//if user not logged in=> show outline likebutton + link to login page
    
    const {user} = useContext(AuthContext) 
    const [liked,setLiked] = useState(false)
    useEffect(()=>{
      if(user && likes.find(like=>like.username==user.username)){
        setLiked(true)
      }else{
        setLiked(false)
      }
    },[user,likes])
    //if u don't destructure it like {user} and use user then u need user.user.username to access
    
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
     <Button  labelPosition='right' as={Link} to={`/login`}>
      <Button color='red' 
       basic={true} >
        <Icon name='heart' />
       </Button>
         <Label as='a' basic color='teal' pointing='left'>
          {likeCount}
         </Label>
        </Button>
    
        )
    
  return ( <Popup inverted content={liked?'UnLike post':'Like post'} trigger={
    likeButtonComponent
  }/>
  )
}

export default LikeComponent

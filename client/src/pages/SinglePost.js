import { useMutation, useQuery } from '@apollo/client';
import React, { useContext } from 'react'
import { DELETE_POST_MUTATION, FETCH_ALL_POSTS_QUERY, FETCH_SINGLE_POST_QUERY } from '../util/Query';
import { Grid,Button, GridColumn, Card, Image, Icon } from 'semantic-ui-react';
import LikeComponent from '../components/LikeComponent';
import { AuthContext } from '../context/Auth';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import CommentComponent from '../components/CommentComponent';

const SinglePost = () => {
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const {postId} = useParams();
    
 
   console.log('SinglePost---------postId=>',postId)

  
   
    const {loading,data}=  useQuery(FETCH_SINGLE_POST_QUERY,{
       
        variables:{
            postId:postId
        },onError(err){
            console.log('fetch singe post error------------',err)
        }
    })

    const {getPost} = data || {}
    console.log('Fetch single Query result======',getPost);

    const [deletePost] = useMutation(DELETE_POST_MUTATION,{
       update(_,result){

        setTimeout(()=>navigate('/'),100) 
       },
        variables:{postId:postId},
        refetchQueries: [{ query: FETCH_ALL_POSTS_QUERY }],//updates apolloclient cache 
    
        })
    let postMarkup;
    if (!getPost){
        postMarkup= <p>Loading the post</p>
    }
    else{
        const {id, username, createdAt,likes, likeCount, commentCount, comments,body  } = getPost
        postMarkup=
        ( <Grid>
             <Grid.Row>
            
             <Grid.Column width={2}>
             <Image floated="right"
              size="massive"
             src="https://react.semantic-ui.com/images/avatar/large/molly.png"/>
             </Grid.Column>
             <Grid.Column width={10}>
             <Card fluid>
                 <Card.Content>
                     <Card.Header>{username}</Card.Header>
                     <Card.Meta  as={Link} 
                     to={`/posts/${id}`}>{moment(createdAt).fromNow()}
                     </Card.Meta>
             <Card.Description>{body}</Card.Description>
                 </Card.Content>
                 <hr/>
                 <Card.Content extra>
                     <LikeComponent user={user} post={{id, likes, likeCount}}/>
                     <CommentComponent post={{id, commentCount}}/>
                     {
                     user && user.username===username &&
                         (
                             <Button  labelPosition='right' floated='right' onClick={deletePost}>
                             <Button color='grey' basic={false}>
                             <Icon name='trash' style={{margin:0}}/>
                             </Button>
                         </Button>   
                         )
                      }
                 </Card.Content>
             </Card>
             </Grid.Column>
             </Grid.Row>
         </Grid>
         )
    }
         
        


  return (
    postMarkup
  )
}

export default SinglePost

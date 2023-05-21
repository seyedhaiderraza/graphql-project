import { useMutation, useQuery } from '@apollo/client';
import React, { useContext, useRef, useState } from 'react'
import { CREATE_COMMENT_MUTATION, DELETE_POST_MUTATION, FETCH_ALL_POSTS_QUERY, FETCH_SINGLE_POST_QUERY } from '../util/Query';
import { Grid,Button, GridColumn, Card, Image, Icon, Form } from 'semantic-ui-react';
import LikeComponent from '../components/LikeComponent';
import { AuthContext } from '../context/Auth';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import CommentComponent from '../components/CommentComponent';
import DeleteComponent from '../components/DeleteComponent';

const SinglePost = () => {
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const {postId} = useParams();
    const [error, setError] = useState(null)
    const [comment, setComment] = useState('')
    const commentInputRef=useRef(null)//for blurring field after posting comment
   console.log('SinglePost---------postId=>',postId)

  
   const [createComment] = useMutation(CREATE_COMMENT_MUTATION,{
    update(_,results){
        setComment('')
        commentInputRef.current.blur()
    },variables:{postId:postId,body:comment}
   })
    const {loading,data}=  useQuery(FETCH_SINGLE_POST_QUERY,{
       
        variables:{
            postId:postId
        },onError(err){
            setError(err?.graphQLErrors[0]?.message)
            console.log('fetch single post error------------',err?.graphQLErrors[0]?.message)
           
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
    if (!getPost && !error){
        postMarkup= <p>Loading the post</p>
    }
    else if(error){
        postMarkup= <h1>Please Login <br/><Button color='teal' as={Link} to={'/login'}>Login</Button> <br/>or<br/> Register<br/><Button color='blue' as={Link} to={'/register'}>Register</Button> <br/>to view this post</h1>
      
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
             {
                user && (
                    <Card fluid>
                        <Card.Content>
                            <p>Post a Comment</p>
                            <Form>

                                <div className="ui action input fluid">
                                    <input type="text" placeholder="Comment.."
                                    name="comment"
                                    value={comment}
                                    onChange={event=>setComment(event.target.value)} />
                                    <button type ="submit"
                                    className="ui button teal"
                                    onClick={createComment}
                                    disabled={comment.trim===''}
                                    ref={commentInputRef}>
                                       Submit
                                    </button>
                                </div>
                            </Form>
                        </Card.Content>
                    </Card>
                )
             }
             {
                comments.map(comment=>(
                    <Card fluid key={comment.id}>
                        <Card.Content>
                        {user && user.username ===comment.username &&(
                            <DeleteComponent postId={postId} commentId={comment.id}/>
                        )}
                            <Card.Header>
                                {comment.username}
                            </Card.Header>
                            <Card.Meta>
                                {moment(comment.createdAt).fromNow()}
                            </Card.Meta>
                            <Card.Description>
                                {comment.body}
                            </Card.Description>
                        </Card.Content>
                    </Card>
                )

                )
             }
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

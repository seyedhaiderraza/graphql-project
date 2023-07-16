import {Button, Card, Icon, Image, Label} from 'semantic-ui-react';
import moment from 'moment'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/Auth';
import { useContext, useEffect, useState } from 'react';
import LikeComponent from '../components/LikeComponent'
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_POST_MUTATION, FETCH_ALL_POSTS_QUERY } from '../util/Query';
import CommentComponent from './CommentComponent';
import DeleteComponent from './DeleteComponent';

function PostCard(props){
    const {id, createdAt, username, body,likes , likeCount, commentCount} = props.post
    const {user} = useContext(AuthContext)
    //fluid makes card take more width 
   
    const [randomImageGen, setRandomImageGen] = useState(1)

    useEffect(()=>{
        setRandomImageGen(Math.floor(Math.random() * 15) + 1)
    },[])
    const commmentOnPost = ()=>{

    }
    return(
        <Card fluid>
            <Card.Content>
                <Image floated="right" size="mini" src={require(`../images/${randomImageGen}.jpg`)}/>
                <Card.Header>{username}</Card.Header>
                <Card.Meta  as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content>
                <LikeComponent user={user} post={{id, likes, likeCount}}/>
               <CommentComponent post={{id, commentCount}}/>
                {user && user.username===username &&
                (
               <DeleteComponent postId={id}/>
                )


                }
            </Card.Content>
        </Card>
    )
}
export default PostCard
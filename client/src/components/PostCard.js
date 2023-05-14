import {Button, Card, Icon, Image, Label} from 'semantic-ui-react';
import moment from 'moment'
import { Link } from 'react-router-dom';
function PostCard(props){
    const {id, createdAt, username, body, likeCount, commentCount} = props.post
    
    //fluid makes card take more width 
    const likePost = ()=>{

    }
    const commmentOnPost = ()=>{

    }
    return(
        <Card fluid>
            <Card.Content>
                <Image floated="right" size="mini" src="https://react.semantic-ui.com/images/avatar/large/molly.png"/>
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content>
                <Button as='div' labelPosition='right' onClick={likePost}>
                    <Button color='red' basic={likeCount===0?true:false}>
                    <Icon name='heart' />
                    </Button>
                    <Label as='a' basic color='teal' pointing='left'>
                           {likeCount}
                    </Label>
                </Button>
                <Button as='div' labelPosition='right' onClick={commmentOnPost}>
                    <Button color='blue' basic={commentCount===0?true:false}>
                    <Icon name='comment' />
                    </Button>
                    <Label as='a' basic color='teal' pointing='left'>
                           {commentCount}
                    </Label>
                </Button>
            </Card.Content>
        </Card>
    )
}
export default PostCard
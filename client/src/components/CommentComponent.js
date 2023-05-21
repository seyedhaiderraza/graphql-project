import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Label } from 'semantic-ui-react'

const CommentComponent = ({post:{id,commentCount}}) => {
  return (
    <Button  labelPosition='right' as={Link} to={`/posts/${id}`}>
    <Button color='blue' basic={commentCount===0?true:false}>
    <Icon name='comment' />
    </Button>
    <Label as='a' basic color='teal' pointing='left'>
           {commentCount}
    </Label>
</Button>
  )
}

export default CommentComponent

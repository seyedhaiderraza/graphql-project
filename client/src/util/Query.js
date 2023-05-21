import gql from "graphql-tag"
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

const FETCH_ALL_POSTS_QUERY = gql`
query{
    getPosts{
        id createdAt body username 
        likeCount commentCount
        likes{
            id username
        }
        comments{
            id createdAt body username
        }
    }
}
`

const LIKE_POST_MUTATION = gql `
mutation LikeUnlikePost($postId: String!) {
  likeUnlikePost(postId: $postId) {
    id 
    likes{
      id username
    }
    likeCount
  }
}
`
const DELETE_POST_MUTATION = gql `
mutation DeletePost($postId: ID!) {
  deletePost(postId: $postId)
}
`
const FETCH_SINGLE_POST_QUERY = gql`
query($postId: ID!) {
  getPost(postId: $postId) {
    id
    body
    createdAt
    likeCount
    commentCount
    comments {
      createdAt
      body
      id
      username
    }
   
    likes {
      username
    }
    username
  }
}
`
const DELETE_COMMENT_MUTATION = gql`
mutation DeleteComment($postId: ID!, $commentId: String!) {
  deleteComment(postId: $postId, commentId: $commentId) {
    body
    commentCount
    comments {
      username
      id
      createdAt
      body
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
const CREATE_COMMENT_MUTATION = gql`
mutation CreateComment($postId: ID!, $body: String!) {
  createComment(postId: $postId, body: $body) {
    comments {
      body
      createdAt
      id
      username
    }
    body
    commentCount
    createdAt
    id
    likeCount
    likes {
      createdAt
      id
      username
    }
    username
  }
}`
export {CREATE_POST_MUTATION, FETCH_ALL_POSTS_QUERY, LIKE_POST_MUTATION, DELETE_POST_MUTATION, FETCH_SINGLE_POST_QUERY, DELETE_COMMENT_MUTATION, CREATE_COMMENT_MUTATION}
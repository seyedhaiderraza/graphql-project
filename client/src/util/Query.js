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
export {CREATE_POST_MUTATION, FETCH_ALL_POSTS_QUERY, LIKE_POST_MUTATION, DELETE_POST_MUTATION}
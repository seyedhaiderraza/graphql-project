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
export {CREATE_POST_MUTATION, FETCH_ALL_POSTS_QUERY}
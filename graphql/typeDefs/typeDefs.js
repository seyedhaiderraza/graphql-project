const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const typeDefs = gql `
type Post{
    id:ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
}
type Comment{
    id: ID!
    createdAt: String!
    username: String!
    body: String!
}
type Like{
    id: ID!
    createdAt: String!
    username: String!
}
type User{
    id: ID!
    username: String!
    password: String!
    email: String!
    createdAt: String!
    token: String!
}
input registerUserInput{
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
}
type Query{
    getPosts : [Post]
    getPost(postId: ID!): Post
}
type Query{
    getUsers : [User]
}
type Mutation{
    registerUser(registerUserInput: registerUserInput): User!
    loginUser(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: String!, commentId: String!):Post!
    likeUnlikePost(postId:String!): Post!
}
`
module.exports = typeDefs
const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose')

require('dotenv').config()
const mongoURL = process.env.MONGO_DB
const port = process.env.PORT

const postModel = require('./models/Post')
const userModel = require('./models/User')
const typeDefs = require('./graphql/typeDefs/typeDefs')

const resolvers = require('./graphql/resolvers/resolvers')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
})

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to mongodb');
        return server.listen({ port: 5000 })
    })
    .then(res => {
        console.log(`Server running at ${res.url}`);
    })
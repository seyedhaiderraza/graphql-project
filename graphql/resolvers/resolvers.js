const postsResolvers = require('./PostResolver')
const usersResolvers = require('./UserResolver')
const resolvers = {
    Query: {
        ...postsResolvers.Query

    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation
    }
}

module.exports = resolvers
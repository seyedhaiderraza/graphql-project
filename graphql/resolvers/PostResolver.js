const postModel = require('../../models/Post')
const { checkAuth } = require('../../utils/checkAuthorisation')
const postResolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await postModel.find()
                return posts
            } catch (err) {
                throw new Error(err)
            }
        },
        async getPost(_, args, context) {
            const user = checkAuth(context)
            try {
                if (user) {
                    const existingPost = postModel.findById(args.postId)
                    if (existingPost)
                        return existingPost
                    else
                        throw new Error('Post not found')
                }
            } catch (err) {
                throw new Error('user not found')
            }
        }
    },
    Mutation: {
        async createPost(_, args, context) {
            const user = checkAuth(context)
                //no need to assert user as error handling already done in checkauth
            try {
                const newPost = new postModel({
                    user: user.id,
                    username: user.username,
                    body: args.body,
                    createdAt: new Date().toISOString()
                })
                return await newPost.save()


            } catch (err) {
                throw new Error(err)
            }
        },
        async deletePost(_, { postId }, context) {
            const user = checkAuth(context)
            try {
                if (user) {
                    const existingPost = postModel.findById(postId)
                    if (existingPost) {
                        const deleteStatus = await postModel.deleteOne({ _id: postId })
                        console.log(deleteStatus);
                        return deleteStatus.deletedCount === 1 ? 'post deleted successfully' : "post delete failure"
                    }
                }
            } catch (err) {
                throw new Error(err)
            }
        }
    }
}

module.exports = postResolvers
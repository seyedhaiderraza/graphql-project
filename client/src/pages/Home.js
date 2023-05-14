import { useQuery } from '@apollo/client'
import { gql } from 'graphql-tag'
import React from 'react'
import { Grid } from 'semantic-ui-react'
import PostCard from '../components/PostCard'

function Home() {
    const {loading, data} = useQuery(FETCH_ALL_POSTS_QUERY)
  const {getPosts} = data||{} // if we don't put ||{} this will read data as undefined when fetch query is loading will give error so we assing {} initially untill data is loaded
  
        // if column={3} is missing post cards will be displayed on one column only which is all vertically
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
      <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {loading?(
            <h1>Loading posts</h1>
          ):(
            getPosts && getPosts.map(post=>(
              <Grid.Column key={post.id} style={{marginBottom: 20}}>
                <PostCard post={post}/>
              </Grid.Column>
            ))
          )}
        </Grid.Row>
    </Grid>

  )
}

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
export default Home

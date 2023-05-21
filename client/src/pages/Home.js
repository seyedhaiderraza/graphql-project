import { useQuery } from '@apollo/client'
import { gql } from 'graphql-tag'
import React, { useContext } from 'react'
import { Grid, Transition, TransitionGroup } from 'semantic-ui-react'
import PostCard from '../components/PostCard'
import { AuthContext } from '../context/Auth';
import CreatePostForm from '../components/CreatePostForm'
import { FETCH_ALL_POSTS_QUERY } from '../util/Query'
function Home() {
    const {loading, data} = useQuery(FETCH_ALL_POSTS_QUERY)
  const {getPosts} = data||{} // if we don't put ||{} this will read data as undefined when fetch query is loading will give error so we assing {} initially untill data is loaded
  
        // if column={3} is missing post cards will be displayed on one column only which is all vertically
  const {user} = useContext(AuthContext)
  
  
        return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
      <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
      
        {user && <Grid.Column key={null} ><CreatePostForm/></Grid.Column>}
          {loading?(
            <h1>Loading posts</h1>
          ):(
            <TransitionGroup>
            {getPosts && getPosts.map(post=>(
              <Grid.Column key={post.id} style={{marginBottom: 20}}>
                <PostCard post={post} />
              </Grid.Column>
            ))}
            </TransitionGroup>
          )}
        </Grid.Row>
    </Grid>

  )
}

export default Home

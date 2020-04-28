import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, CardContent } from '@material-ui/core';
import Loadmore from './components/Loadmore';

const Div = styled.div`
  margin : 0 auto;
  width : 50%;
  
  div {
    width : 100%;
    height : 80px;
    text-align : center;
    margin : 3px;
    color : white;
  }
`

const posts = new Array(50).fill('Lorm ipsm dolor sit amet consectetur.').map((data, index) => `${index + 1}: ${data}`); //Dummp Data
const firstDisplay = posts.slice(0, 10); // Slice Data เริ่มต้น = 10

function App() {
  const [displayPost, setDisplayPost] = useState(firstDisplay);

  return (
    <React.Fragment>
      {displayPost.map((post) => {
        return (
          <Div key={post}>
            <Card style={{ backgroundImage: 'linear-gradient(to right top, #27508e, #3b63a2, #4e76b6, #608acb, #739ee0)' }}>
              <CardContent>{post}</CardContent>
            </Card>
          </Div>
        )
      })}

      <Loadmore
        display={displayPost}
        setDisplay={setDisplayPost}
        data={posts}
      />
    </React.Fragment>
  );
}

export default App;

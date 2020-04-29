import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Loadmore from './components/Loadmore';
import axios from 'axios';
const keyUnsplas = 's73nTc9WvbURJYxPJ9jjL9BDGXb4pD705NQlZi3poUM';

const GlobalStyle = createGlobalStyle`
  body {
    display: flex;
    justify-content: center;
    align-content: center;
    background: #060c21;
  }
`

const Div = styled.div`
  display : flex;
  flex-flow:  row wrap;
  justify-content : center;

  @media(max-width : 768px) {
      width : 100%;
  }
`
const Box = styled.div`
  margin-top : 10px;
  margin-left : 10px;
  position : relative;
  width : 200px;
  height : 300px;
  background : #060c21;

  &:before {
    content : '';
    position : absolute;
    top : -2px;
    left : -2px;
    right: -2px;
    bottom : -2px;
    z-index : -1 ;
  }

  &:after {
    content : '';
    position : absolute;
    top : -2px;
    left : -2px;
    right: -2px;
    bottom : -2px;
    z-index : -2 ;
    filter : blur(40px);
  }

  &:before,:after {
    background : linear-gradient(235deg,#89ff00,#060c21,#00bcd4);
  }

  @media(max-width : 768px) {
    width : 80px;
    height : 120px;
  }
`
const PriveImage = styled.div`
  img {
    object-fit : cover;
    width : 100%;
    height : 300px;
    filter: grayscale(50%) brightness(80%);
    transition : 0.5s;
  }
  
  &:hover {
    filter: saturate(203%) brightness(125%);
  }

  @media(max-width : 768px) {
    img {
      width : 80px;
      height : 120px;
    }
  }
`
const Title = styled.div`
  color : white;
  text-align : center;
  font-size : 20px;
  font-weight : bold;
  padding : 30px;
  text-shadow : 5px 10px 16px #09DF94;
`

function App() {
  const [displayPost, setDisplayPost] = useState([]);
  const [page, setPage] = useState(1)

  const getPhotos = () => {
    axios.get(`https://api.unsplash.com/photos/?client_id=${keyUnsplas}&page=${page}`).then((res) => {
      let { data } = res;
      setDisplayPost([...displayPost, ...data])
      setPage(page + 1);
    }).catch(e => {
      console.log(e);
    })
  }

  useEffect(() => {
    const callApi = async () => {
      await getPhotos();
    }
    callApi();
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <GlobalStyle />
      <Title>
        <span role="img" aria-label="photo">Example React With Infinite Scroll Gallery 📷</span>
      </Title>
      <Div>
        {displayPost.map((display, index) => {
          const { alt_description, urls: { regular } } = display
          return (
            <React.Fragment key={index}>
              <Box>
                <React.Fragment>
                  <PriveImage>
                    <img key={index} src={regular} alt={alt_description} />
                  </PriveImage>
                </React.Fragment>
              </Box>
            </React.Fragment>
          )
        })}

      </Div>
      <Loadmore
        loadData={getPhotos}
      />
    </React.Fragment>
  )
}


export default App;

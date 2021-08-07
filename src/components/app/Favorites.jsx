import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from './Header';
import DetailedCharacterList from './DetailedCharacterList';
import { useLocation } from 'react-router-dom';

export default function Favorites(){
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, []);
  return (
    <Page>
      <Header/>
      <DetailedCharacterList/>
    </Page>
  );
}

const Page = styled.div`
display: flex;
flex-direction: column;
width: 100%;`;

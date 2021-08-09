import React from 'react';
import { useFavorites } from '../../state/hooks.js';
import styled from 'styled-components';

export default function DetailedCharacterList(){
  const { favorites, deleteFavorite } = useFavorites();
 
  // console.log(favorites);
  const listItems = favorites.map(item => {
    return (
      <Li key={item.characterId}>
        <img src={item.image} alt={item.name}/>
        <Button onClick={() => deleteFavorite(item.characterId)}> X </Button>
        <h1> {item.name} </h1>
      </Li>
    );
  });

  return <List> {listItems} </List>;
}

const List = styled.ul`
list-style: none;
display: grid;
grid-template-columns: repeat(4, 1fr);
justify-content: space-between;
margin-left: 200px;`;

const Li = styled.li`
position: relative;
margin-bottom: 10px;
`;

const Button = styled.button`
position: absolute;
bottom: 140px;
left: 20px;
height: 30px;
width: 30px;
font-size: 2rem;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
`;

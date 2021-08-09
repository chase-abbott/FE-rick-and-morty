/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const useAuth = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');

  const changeUsername = ({ target }) => {
    return setUsername(target.value);
  };

  const changePassword = ({ target }) => {
    return setPassword(target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    return fetch(`https://stormy-lowlands-99070.herokuapp.com/api/auth/${e.target.value}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(res => {
        setUser(res);
        return history.push('/home', [res]);
      });
  };


  return { 
    username, 
    password, 
    user,
    changeUsername, 
    changePassword, 
    handleSubmit
  };
};

const useCharacters = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    return fetch('https://stormy-lowlands-99070.herokuapp.com/characters/all')
      .then(res => res.json())
      .then(res => setCharacters(res));
  }, []);

  return { characters };
};

const useFavorites = () => {
  const { state } = useLocation();
  const user = state[0];
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    return fetch(`https://stormy-lowlands-99070.herokuapp.com/characters/user/${user.userId}`)
      .then(res => res.json())
      .then(res =>  setFavorites(res));
  }, []);

  const addFavorite = (character) => {
    return fetch('https://stormy-lowlands-99070.herokuapp.com/characters/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ character, user })
    })
      .then(res => res.json())
      .then(res => setFavorites([...favorites, res]));
  };

  const deleteFavorite = (charId) => {
    return fetch(`https://stormy-lowlands-99070.herokuapp.com/characters/user/${charId}/${user.userId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        const newArray = favorites.filter(char => char.characterId !== res.characterId);
        console.log(newArray);        
        return setFavorites(newArray);
      });
     
  };

  const updateFavorite = (charId, body) => {
    return fetch(`https://stormy-lowlands-99070.herokuapp.com/characters/user/${charId}/${user.userId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(res => setFavorites([...favorites, res]));
  };

  return { favorites, addFavorite, deleteFavorite, updateFavorite };
};


export { useAuth, useCharacters, useFavorites };

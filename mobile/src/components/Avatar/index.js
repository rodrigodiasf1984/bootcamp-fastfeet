import React,{useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import { CredentialsContainer, Letters } from './styles';
import {Image} from 'react-native';

export default function Avatar({...rest}) {
  const deliveryman = useSelector(state=>state.auth.deliveryman);
  const [initals, setInitials]= useState([]);

  async function getInitals() {
    const name = deliveryman.name;
    let matches = name.match(/\b\w/g) || [];
    matches = ((matches.shift() || '') + (matches.pop() || '')).toUpperCase();
    //console.tron.log(initials);
    setInitials(matches);
  }
  useEffect(() => {
    getInitals();

  }, []);

  return (
    <CredentialsContainer {...rest}>
      <Letters >{initals}</Letters>
    </CredentialsContainer>
  );
}


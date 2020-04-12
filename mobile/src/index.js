import React from 'react';
import Routes from '~/routes';
import { StatusBar } from 'react-native';
// import { Container } from './styles';
export default function App() {
  return(
    <>
      <StatusBar  barStyle="light-content" backgroundColor="#7159c1"/>
      <Routes />
      </>
  ) ;

}

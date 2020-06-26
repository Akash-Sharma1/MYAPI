import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProjectNamePage from './components/ProjectNamePage';
import CreateDatabases from './components/CreateDatabases';
import FormPage from './components/FormPage';

const Stack = createStackNavigator();
export default function App(){
  return (
    <FormPage/>
  );
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import { DbHelper } from './utils/DbHelper';

import home from './Screens/Home'; 
import quizSelection from './Screens/QuizSelection'; 
import HomeTema from './Screens/HomeTema'; 
import CrudTema from './Screens/CrudTema';

const Stack = createStackNavigator();

export default function App(){
  useEffect(()=> {
    DbHelper.startDb();
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={home}/>
        <Stack.Screen name="QuizSelection" component={quizSelection}/>
        <Stack.Screen name="HomeTema" component={HomeTema}/>
        <Stack.Screen name="CrudTema" component={CrudTema}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
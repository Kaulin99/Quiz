import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
//import DhHelper from './path-to-dhhelper'; // Adjust the import according to your project structure

import home from './Screens/Home'; // Adjust the import according to your project structure
import quizSelection from './Screens/QuizSelection'; // Adjust the import according to your project structure
import quizSettings from './Screens/QuizSettings'; // Adjust the import according to your project structure

const Stack = createStackNavigator();

export default function App(){
 /*  useEffect(()=> {
    DhHelper.startDb();
  }, []) */

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={home}/>
        <Stack.Screen name="QuizSelection" component={quizSelection}/>
        <Stack.Screen name="QuizSettings" component={quizSettings}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
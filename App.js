import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import { DbHelper } from './utils/DbHelper';

import Home from './Screens/Home'; 
import QuizSelection from './Screens/QuizSelection'; 
import HomeTema from './Screens/HomeTema'; 
import CrudTema from './Screens/CrudTema';
import HomePergunta from './Screens/HomePergunta';
import CrudPergunta from './Screens/CrudPerguntas';
import GameScreen from './Screens/GameScreen';


console.log("CARREGANDO App.js - " + new Date().toLocaleTimeString());

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    DbHelper.startDb()
      .then(() => console.log("Banco pronto!"))
      .catch(err => console.error("Erro ao iniciar banco:", err));
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="QuizSelection" component={QuizSelection}/>
        <Stack.Screen name="HomeTema" component={HomeTema}/>
        <Stack.Screen name="CrudTema" component={CrudTema}/>
        <Stack.Screen name="HomePergunta" component={HomePergunta}/>
        <Stack.Screen name="CrudPergunta" component={CrudPergunta}/>
        <Stack.Screen name="GameScreen" component={GameScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
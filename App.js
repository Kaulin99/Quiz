import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import { DbHelper } from './utils/DbHelper';

import Home from './Screens/Home'; 
import QuizSelection from './Screens/QuizSelection'; 
import HomeTema from './Screens/HomeTema'; 
import CrudTema from './Screens/CrudTema';
import CrudPergunta from './Screens/CrudPergunta';
import HomePergunta from './Screens/HomePergunta';

console.log("Abrindo conexão com o banco - " + new Date().toLocaleTimeString());
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
        <Stack.Screen name="CrudPergunta" component={CrudPergunta}/>
        <Stack.Screen name="HomePergunta" component={HomePergunta}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
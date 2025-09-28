import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../Styles/Home';

export default function Home({ navigation}) {
    return (

        <View style={styles.container}>
            <Text>Quiz do pix de 1 conto</Text>
            <TouchableOpacity onPress={() => navigation.navigate('QuizSelection')}>
                <Text>"Jogar Quizzes (Não sabemos o plural de Quiz)"</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('QuizSettings')}> 
                <Text>"Lista de Quiz"</Text>
            </TouchableOpacity>
        </View>
    ) 
}
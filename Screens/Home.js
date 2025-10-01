import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import styles from '../Styles/Home';
import { FontAwesome } from '@expo/vector-icons'; 

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            
            <View style={styles.header}>
                <FontAwesome name="question-circle" size={50} color="#007bff" />
                <Text style={styles.title}>QuizMania</Text>
                <Text style={styles.subtitle}>Teste seus conhecimentos! (O Pix é de mentira, mas o conhecimento é de verdade)</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('QuizSelection')}
                >
                    <FontAwesome name="play-circle" size={24} color="#fff" style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Jogar Quizzes</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('HomeTema')}
                >
                    <FontAwesome name="list-alt" size={24} color="#fff" style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Criar/Editar Temas</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
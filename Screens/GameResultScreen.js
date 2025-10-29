import React, { useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import styles from '../Styles/GameResultScreen';
import { FontAwesome } from '@expo/vector-icons';

import TemaController from '../Controller/TemaController'; 

const temaController = new TemaController(); 

export default function GameResultScreen({ route, navigation }) {
    // 1. Recebe os dados da tela do jogo
    const { perguntas, respostasUsuario, temaNome, temaId } = route.params;

    //Incrementa em 1 vez quando o tema é jogado
    useEffect(() => {
        if (temaId) {
            console.log(`Incrementando contador para o tema ID: ${temaId}`);
            temaController.incrementTimePlayed(temaId);
        }
    }, [temaId]); // O array [temaId] garante que o efeito só rode se o temaId existi

    // 2. Calcula a pontuação. useMemo otimiza para que o cálculo só aconteça uma vez.
    const { acertos, totalPerguntas, porcentagem } = useMemo(() => {
        let acertos = 0;
        const totalPerguntas = perguntas.length;

        perguntas.forEach(pergunta => {
            const respostaDoUsuarioId = respostasUsuario[pergunta.id];
            if (!respostaDoUsuarioId) return; // Usuário não respondeu

            // Encontra o texto da alternativa que o usuário selecionou
            const alternativaDoUsuario = pergunta.alternativas.find(alt => alt.id === respostaDoUsuarioId);
            
            // Compara com a resposta correta
            if (alternativaDoUsuario && alternativaDoUsuario.texto.trim().toLowerCase() === pergunta.resposta.trim().toLowerCase()) {
                acertos++;
            }
        });

        const porcentagem = totalPerguntas > 0 ? Math.round((acertos / totalPerguntas) * 100) : 0;

        return { acertos, totalPerguntas, porcentagem };
    }, [perguntas, respostasUsuario]);

    // Renderiza cada item da lista de resumo
    const renderResultItem = ({ item: pergunta }) => {
        const respostaDoUsuarioId = respostasUsuario[pergunta.id];
        const alternativaDoUsuario = pergunta.alternativas.find(alt => alt.id === respostaDoUsuarioId);
        const isCorrect = alternativaDoUsuario && alternativaDoUsuario.texto.trim().toLowerCase() === pergunta.resposta.trim().toLowerCase();

        return (
            <View style={[styles.resultItem, isCorrect ? styles.correctAnswer : styles.incorrectAnswer]}>
                <Text style={styles.questionText}>{pergunta.pergunta}</Text>
                <Text style={styles.answerText}>Sua resposta: {alternativaDoUsuario?.texto || "Não respondida"}</Text>
                {!isCorrect && <Text style={styles.correctAnswerText}>Resposta correta: {pergunta.resposta}</Text>}
                <FontAwesome 
                    name={isCorrect ? "check-circle" : "times-circle"} 
                    size={24} 
                    color={isCorrect ? "#28a745" : "#dd4f4aff"} 
                    style={styles.icon}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.summaryContainer}>
                <Text style={styles.title}>Resultados do Quiz</Text>
                <Text style={styles.subtitle}>Tema: {temaNome}</Text>

                <Text style={styles.percentageText}>{porcentagem}%</Text>
                <Text style={styles.scoreText}>
                    Você acertou {acertos} de {totalPerguntas} perguntas
                </Text>
            </View>

            <FlatList
                data={perguntas}
                renderItem={renderResultItem}
                keyExtractor={item => item.id.toString()}
                style={styles.list}
            />

            <View style={styles.footerButtons}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('QuizSelection')}>
                    <Text style={styles.buttonText}>Jogar Novamente</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.homeButton]} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Voltar ao Início</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
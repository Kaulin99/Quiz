import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

// Removi useRoute e useNavigation para mostrar como pegar dos props, que é mais comum
// Mas usar os hooks como você fez também está correto.
export default function GameScreen({ route, navigation }) {
    // Pega os parâmetros passados pela tela anterior
    const { perguntas, temaNome } = route.params;

    // Estado para controlar qual pergunta está sendo exibida
    const [currentIndex, setCurrentIndex] = useState(0);
    // NOVO ESTADO: Um objeto para armazenar as respostas do usuário { perguntaId: respostaId }
    const [respostasUsuario, setRespostasUsuario] = useState({});

    const currentPergunta = perguntas[currentIndex];

    // Embaralha as alternativas da pergunta atual para que a resposta correta não fique sempre no mesmo lugar.
    // `useMemo` garante que o embaralhamento só aconteça quando a pergunta mudar.
    const alternativasEmbaralhadas = useMemo(
        () => [...currentPergunta.alternativas].sort(() => Math.random() - 0.5),
        [currentPergunta]
    );

    // Função chamada quando o quiz termina
    const finalizarQuiz = () => {
        navigation.replace('GameResultScreen', {
            perguntas: perguntas, // A lista de perguntas original
            respostasUsuario: respostasUsuario // O objeto com as respostas do usuário
        });
    };

    // Função chamada quando o usuário seleciona uma alternativa
    const handleAnswer = (alternativaId) => {
        // Salva a resposta do usuário para a pergunta atual
        const novasRespostas = {
            ...respostasUsuario,
            [currentPergunta.id]: alternativaId
        };
        setRespostasUsuario(novasRespostas);

        // Avança para a próxima pergunta ou finaliza o quiz
        if (currentIndex < perguntas.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            // Se for a última pergunta, navega para a tela de resultados
            navigation.replace('GameResultScreen', {
                perguntas: perguntas,
                respostasUsuario: novasRespostas // Usa as respostas atualizadas
            });
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.title}>🎯 {temaNome}</Text>
            <Text style={styles.counter}>
                Pergunta {currentIndex + 1} de {perguntas.length}
            </Text>

            <View style={styles.questionBox}>
                <Text style={styles.questionText}>{currentPergunta.pergunta}</Text>
            </View>

            {/* Renderiza a lista de alternativas embaralhadas */}
            <View style={styles.alternativesContainer}>
                {alternativasEmbaralhadas.map((alternativa) => (
                    <TouchableOpacity
                        key={alternativa.id}
                        style={styles.alternativeButton}
                        onPress={() => handleAnswer(alternativa.id)}
                    >
                        <Text style={styles.alternativeText}>{alternativa.texto}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

// ESTILOS NOVOS E MELHORADOS
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: 10,
    },
    counter: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        marginBottom: 20,
    },
    questionBox: {
        padding: 25,
        borderRadius: 15,
        backgroundColor: '#ffffff',
        marginBottom: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    questionText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#333',
        lineHeight: 24,
    },
    alternativesContainer: {
        width: '100%',
    },
    alternativeButton: {
        backgroundColor: '#6C63FF',
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    alternativeText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
});
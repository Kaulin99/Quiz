import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';

export default function GameScreen({ route, navigation }) {
    // Validação 1: Verificar se route.params existe
    if (!route || !route.params) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Erro: Dados não encontrados</Text>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>← Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const { perguntas, temaNome, temaId } = route.params;

    // Validação 2: Verificar se perguntas existe e não está vazia
    if (!perguntas || !Array.isArray(perguntas) || perguntas.length === 0) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>❌ Nenhuma pergunta disponível</Text>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>← Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const [currentIndex, setCurrentIndex] = useState(0);
    const [respostasUsuario, setRespostasUsuario] = useState({});

    const currentPergunta = perguntas[currentIndex];

    // Validação 3: Verificar se a pergunta atual existe e tem alternativas
    if (!currentPergunta || !currentPergunta.alternativas || !Array.isArray(currentPergunta.alternativas)) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>⚠️ Erro ao carregar pergunta</Text>
                <Text style={styles.errorSubtext}>
                    Pergunta {currentIndex + 1} está com dados incompletos
                </Text>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>← Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Embaralha as alternativas
    const alternativasEmbaralhadas = useMemo(
        () => {
            if (!currentPergunta.alternativas || currentPergunta.alternativas.length === 0) {
                return [];
            }
            return [...currentPergunta.alternativas].sort(() => Math.random() - 0.5);
        },
        [currentPergunta]
    );

    // Função chamada quando o usuário seleciona uma alternativa
    const handleAnswer = (alternativaId) => {
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
                respostasUsuario: novasRespostas,
                temaId: temaId,
                temaNome: temaNome
            });
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.title}>🎯 {temaNome || 'Quiz'}</Text>
            <Text style={styles.counter}>
                Pergunta {currentIndex + 1} de {perguntas.length}
            </Text>

            {/* Barra de progresso */}
            <View style={styles.progressBarContainer}>
                <View 
                    style={[
                        styles.progressBarFill, 
                        { width: `${((currentIndex + 1) / perguntas.length) * 100}%` }
                    ]} 
                />
            </View>

            <View style={styles.questionBox}>
                <Text style={styles.questionText}>{currentPergunta.pergunta}</Text>
            </View>

            {/* Renderiza a lista de alternativas embaralhadas */}
            <View style={styles.alternativesContainer}>
                {alternativasEmbaralhadas.length > 0 ? (
                    alternativasEmbaralhadas.map((alternativa) => (
                        <TouchableOpacity
                            key={alternativa.id}
                            style={styles.alternativeButton}
                            onPress={() => handleAnswer(alternativa.id)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.alternativeText}>{alternativa.texto}</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.errorText}>Nenhuma alternativa disponível</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        justifyContent: 'center',
    },
    errorContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: '#d9534f',
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: '600',
    },
    errorSubtext: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: '#6C63FF',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 20,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
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
        marginBottom: 10,
    },
    progressBarContainer: {
        height: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 20,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#6C63FF',
        borderRadius: 4,
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
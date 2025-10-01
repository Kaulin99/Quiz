import React, { useState, useMemo } from 'react';
import styles from '../Styles/GameScreen';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';

export default function GameScreen({ route, navigation }) {
    if (!route || !route.params) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Erro: Dados não encontrados</Text>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>← Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const { perguntas, temaNome, temaId } = route.params;

    if (!perguntas || !Array.isArray(perguntas) || perguntas.length === 0) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>❌ Nenhuma pergunta disponível</Text>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>← Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const [currentIndex, setCurrentIndex] = useState(0);
    const [respostasUsuario, setRespostasUsuario] = useState({});
    
    // Guarda o ID da alternativa que o usuário selecionou, mas ainda não confirmou.
    const [selectedAlternativeId, setSelectedAlternativeId] = useState(null);

    const currentPergunta = perguntas[currentIndex];

    if (!currentPergunta || !currentPergunta.alternativas || !Array.isArray(currentPergunta.alternativas)) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>⚠️ Erro ao carregar pergunta</Text>
                <Text style={styles.errorSubtext}>Pergunta {currentIndex + 1} está com dados incompletos</Text>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>← Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const alternativasEmbaralhadas = useMemo(
        () => [...currentPergunta.alternativas].sort(() => Math.random() - 0.5),
        [currentPergunta]
    );

    // Apenas seleciona a alternativa, não avança o jogo.
    const handleSelectAlternative = (alternativaId) => {
        setSelectedAlternativeId(alternativaId);
    };

    // Chamada pelo novo botão "Confirmar".
    const handleConfirmAnswer = () => {
        if (!selectedAlternativeId) return;

        const novasRespostas = {
            ...respostasUsuario,
            [currentPergunta.id]: selectedAlternativeId
        };
        setRespostasUsuario(novasRespostas);
        
        // Limpa a seleção para a próxima pergunta
        setSelectedAlternativeId(null);

        if (currentIndex < perguntas.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
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
            <Text style={styles.counter}>Pergunta {currentIndex + 1} de {perguntas.length}</Text>

            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBarFill, { width: `${((currentIndex + 1) / perguntas.length) * 100}%` }]} />
            </View>

            <View style={styles.questionBox}>
                <Text style={styles.questionText}>{currentPergunta.pergunta}</Text>
            </View>

            <View style={styles.alternativesContainer}>
                {alternativasEmbaralhadas.map((alternativa) => (
                    <TouchableOpacity
                        key={alternativa.id}
                        style={[
                            styles.alternativeButton,
                            selectedAlternativeId === alternativa.id && styles.selectedAlternative
                        ]}
                        onPress={() => handleSelectAlternative(alternativa.id)}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.alternativeText}>{alternativa.texto}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Ele só aparece se uma alternativa tiver sido selecionada */}
            {selectedAlternativeId && (
                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={handleConfirmAnswer}
                >
                    <Text style={styles.confirmButtonText}>Confirmar</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

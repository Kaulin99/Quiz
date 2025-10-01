import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, Button, Alert, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import TemaController from '../Controller/TemaController';
import PerguntaController from '../Controller/PerguntaController';
import QuizController from '../Controller/QuizController'; // 1. IMPORTE O QUIZ CONTROLLER
import styles from '../Styles/QuizSelection';
import { FontAwesome } from '@expo/vector-icons';

const temaController = new TemaController();
const perguntaController = new PerguntaController();
const quizController = new QuizController(); // 2. CRIE A INSTÂNCIA DO QUIZ CONTROLLER

export default function QuizSelection({ navigation }) {
    // ... (os states e a função fetchData continuam iguais)
    const [temasComPerguntas, setTemasComPerguntas] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTema, setSelectedTema] = useState(null);
    const [numPerguntas, setNumPerguntas] = useState('');

    const fetchData = async () => {
        try {
            const todosOsTemas = await temaController.GetAll();
            const todasAsPerguntas = await perguntaController.GetAll();

            const temasMapeados = todosOsTemas.map(tema => {
                const count = todasAsPerguntas.filter(p => p.temaId === tema.id).length;
                return {
                    id: tema.id,
                    nome: tema.nome,
                    Player: tema.Player,
                    TimePlayed: tema.TimePlayed,
                    questionCount: count
                };
            });

            setTemasComPerguntas(temasMapeados);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            Alert.alert("Erro", "Não foi possível carregar os temas.");
        }
    };
    useFocusEffect(useCallback(() => { fetchData(); }, []));
    const handleOpenModal = (tema) => {
        if (tema.questionCount === 0) {
            Alert.alert("Aviso", "Este tema ainda não possui perguntas cadastradas.");
            return;
        }
        setSelectedTema(tema);
        setModalVisible(true);
        setNumPerguntas('');
    };
    
    // 3. --- FUNÇÃO handleStartGame COMPLETAMENTE ATUALIZADA ---
    const handleStartGame = async () => {
        const num = parseInt(numPerguntas, 10);

        if (!num || num <= 0) {
            Alert.alert("Entrada Inválida", "Por favor, insira um número de perguntas válido.");
            return;
        }

        if (num > selectedTema.questionCount) {
            Alert.alert("Número Excedido", `O número de perguntas não pode ser maior que ${selectedTema.questionCount}.`);
            return;
        }

        try {
            // Usa o QuizController para preparar as perguntas do jogo
            const perguntasDoJogo = await quizController.startNewQuiz(selectedTema.id, num);

            setModalVisible(false);

            // Navega para a tela do jogo passando os dados corretos
            navigation.navigate('GameScreen', { 
                perguntas: perguntasDoJogo, 
                temaNome: selectedTema.nome,
                temaId: selectedTema.id // Passando o temaId também
            });

        } catch (error) {
            console.error("Erro ao iniciar jogo:", error);
            Alert.alert("Erro", "Não foi possível iniciar o jogo. " + error.message);
        }
    };

    // ... (o resto do seu componente: renderTemaCard e o return JSX continuam iguais)
    const renderTemaCard = ({ item }) => (
        <View style={styles.card}>
            <View>
                <Text style={styles.cardTitle}>{item.nome}</Text>
                <Text style={styles.cardSubtitle}>Perguntas: {item.questionCount}</Text>
                <Text style={styles.cardSubtitle}>Jogado {item.TimePlayed} vezes</Text>
            </View>
            <TouchableOpacity style={styles.playButton} onPress={() => handleOpenModal(item)}>
                <FontAwesome name="play" size={20} color="#fff" />
                <Text style={styles.playButtonText}>Jogar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.title}>Selecione um Tema para Jogar</Text>

            <FlatList
                data={temasComPerguntas}
                keyExtractor={item => item.id.toString()}
                renderItem={renderTemaCard}
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhum tema disponível.</Text>}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Quantas perguntas?</Text>
                        <Text style={styles.modalSubtitle}>
                            Tema "{selectedTema?.nome}" tem {selectedTema?.questionCount} perguntas disponíveis.
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Ex: 1"
                            keyboardType="number-pad"
                            value={numPerguntas}
                            onChangeText={setNumPerguntas}
                        />

                        <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
                            <Text style={styles.startButtonText}>Iniciar Jogo</Text>
                        </TouchableOpacity>

                        <Button title="Fechar" onPress={() => setModalVisible(false)} color="#d9534f" />
                    </View>
                </View>
            </Modal>
        </View>
    );
}
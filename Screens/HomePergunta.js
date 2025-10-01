// NOVO ARQUIVO: Screens/HomePergunta.js

import React, { useState, useCallback } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import PerguntaController from '../Controller/PerguntaController';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import styles from '../Styles/HomeTema'; // Reutilizando os mesmos estilos do HomeTema

// Crie a instância do controller fora do componente
const perguntaController = new PerguntaController();

export default function HomePergunta() {
    const [perguntas, setPerguntas] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();
    
    // Recebe o objeto 'tema' passado pela navegação
    const { tema } = route.params;

    // Função para buscar e filtrar as perguntas do tema atual
    async function retrievePerguntas() {
        try {
            const todasAsPerguntas = await perguntaController.GetAll();
            // Filtra as perguntas para mostrar apenas as do tema selecionado
            const perguntasDoTema = todasAsPerguntas.filter(p => p.temaId === tema.id);
            setPerguntas(perguntasDoTema ?? []);
        } catch (error) {
            console.error("Erro ao buscar perguntas:", error);
            Alert.alert("Erro", "Não foi possível carregar as perguntas.");
        }
    }

    // useFocusEffect para recarregar a lista sempre que a tela receber foco
    useFocusEffect(
        useCallback(() => {
            retrievePerguntas();
        }, [tema.id]) // Dependência do ID do tema para recarregar se ele mudar
    );

    // Função para deletar uma pergunta
    const handleDelete = (id) => {
        perguntaController.Delete(id).then(() => {
            // Atualiza o estado local para remover o item da lista visualmente
            setPerguntas(perguntas.filter(p => p.id !== id));
        }).catch(error => {
            console.error("Erro ao deletar pergunta:", error);
            Alert.alert("Erro", "Não foi possível apagar a pergunta.");
        });
    };

    return (
        <View style={styles.container}>
            {/* Título dinâmico com o nome do tema */}
            <Text style={styles.title}>Perguntas do Tema: {tema.nome}</Text>
            
            {/* Botão para criar uma nova pergunta, passando o ID do tema */}
            <Button 
                title="Criar Pergunta" 
                onPress={() => navigation.navigate('CrudPergunta', { temaId: tema.id })} 
            />

            <FlatList
                data={perguntas}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.temaItem}>
                        <Text style={styles.temaTitle}>{item.pergunta}</Text>
                        <Text style={styles.temaSubText}>Resposta: {item.resposta}</Text>
                        
                        <View style={styles.actions}>
                            {/* Botão para editar, passando ID da pergunta e do tema */}
                            <TouchableOpacity onPress={() => navigation.navigate('CrudPergunta', { perguntaId: item.id, temaId: tema.id })}>
                                <Text style={styles.edit}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                <Text style={styles.delete}>Apagar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                ListEmptyComponent={<Text style={{textAlign: 'center', marginTop: 20}}>Nenhuma pergunta cadastrada para este tema.</Text>}
            />
        </View>
    );
}
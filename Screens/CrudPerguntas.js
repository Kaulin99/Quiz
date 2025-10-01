// NOVO ARQUIVO: CrudPergunta.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import PerguntaController from '../Controller/PerguntaController';

// Crie a instância do controller fora do componente
const perguntaController = new PerguntaController();

export default function CrudPergunta({ route, navigation }) {
    // Extrai o ID do tema e o ID da pergunta (se estiver editando)
    const { temaId, perguntaId } = route.params || {};


    // Estados para todos os campos do formulário
    const [pergunta, setPergunta] = useState('');
    const [alternativa1, setAlternativa1] = useState('');
    const [alternativa2, setAlternativa2] = useState('');
    const [alternativa3, setAlternativa3] = useState('');
    const [alternativa4, setAlternativa4] = useState('');
    const [resposta, setResposta] = useState('');
    
    // Carrega dados da pergunta se estiver no modo de edição
    useEffect(() => {
        if (perguntaId) {
            (async () => {
                try {
                    const editor = await perguntaController.GetUnique(perguntaId);
                    if (editor) {
                        setPergunta(editor.pergunta);
                        setAlternativa1(editor.alternativa1);
                        setAlternativa2(editor.alternativa2);
                        setAlternativa3(editor.alternativa3);
                        setAlternativa4(editor.alternativa4);
                        setResposta(editor.resposta);
                    }
                } catch (error) {
                    console.error("Erro ao carregar pergunta:", error);
                }
            })();
        }
    }, [perguntaId]);

    // Função para salvar (chama Insert ou Update do controller)
    async function handleSave() {
        // Validações básicas
        if (!temaId) {
            Alert.alert(
                "Erro Crítico", 
                "Nenhum tema foi selecionado. Volte e tente novamente."
            );
            return;
        }
        if (!pergunta.trim() || !alternativa1.trim() || !alternativa2.trim() || !alternativa3.trim() || !alternativa4.trim() || !resposta.trim()) {
            Alert.alert("Erro", "Todos os campos são obrigatórios!");
            return;
        }

        let status = false;
        if (!perguntaId) {
            // Insert
            status = await perguntaController.Insert(pergunta, alternativa1, alternativa2, alternativa3, alternativa4, resposta, temaId);
        } else {
            // Update
            status = await perguntaController.Update(perguntaId, pergunta, alternativa1, alternativa2, alternativa3, alternativa4, resposta, temaId);
        }

        if (status === true) {
            Alert.alert("Sucesso", "Pergunta salva com sucesso!");
            navigation.goBack(); // Volta para a tela anterior
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{perguntaId ? 'Editar Pergunta' : 'Nova Pergunta'}</Text>
            
            <TextInput style={styles.input} placeholder="Digite a pergunta" value={pergunta} onChangeText={setPergunta} />
            <TextInput style={styles.input} placeholder="Alternativa 1" value={alternativa1} onChangeText={setAlternativa1} />
            <TextInput style={styles.input} placeholder="Alternativa 2" value={alternativa2} onChangeText={setAlternativa2} />
            <TextInput style={styles.input} placeholder="Alternativa 3" value={alternativa3} onChangeText={setAlternativa3} />
            <TextInput style={styles.input} placeholder="Alternativa 4" value={alternativa4} onChangeText={setAlternativa4} />
            <TextInput style={styles.input} placeholder="Resposta Correta (texto exato de uma das alternativas)" value={resposta} onChangeText={setResposta} />

            <Button
                title={perguntaId ? 'Salvar Alterações' : 'Criar Pergunta'}
                onPress={handleSave}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16, borderRadius: 4 },
});
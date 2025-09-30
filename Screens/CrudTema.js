import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import TemaController from '../Controller/TemaController';

// Crie a instância do controller fora do componente
const temaController = new TemaController();

export default function CrudTema({ route, navigation }) {
    const [nome, setNome] = useState('');
    const [player, setPlayer] = useState('');
    const temaId = route.params?.id;

    // Carrega dados do tema se houver id
    useEffect(() => {
        if (temaId) {
            (async () => {
                try {
                    const editor = await temaController.GetUnique(temaId);
                    console.log("Editor retornado:", editor);

                    if (editor) {
                        setNome(editor.nome);   // cuidado com maiúscula/minúscula
                        setPlayer(editor.Player);
                    }
                } catch (error) {
                    console.error("Erro ao carregar tema:", error);
                }
            })();
        }
    }, [temaId]);

    // Função de salvar (Insert ou Update)
    async function handleSave() {
        if (!nome.trim()) {
            Alert.alert("Erro", "O nome do tema não pode ficar vazio!");
            return;
        }

        if (!player.trim()) {
            Alert.alert("Erro", "O nome do jogador não pode ficar vazio!");
            return;
        }

        let status = false;

        if (!temaId || temaId === "") {
            // Insert
            console.log("Criando tema:", { temaId, nome, player });
            status = await temaController.Insert(nome, player);
        } else {
            // Update
            console.log("Atualizando tema:", { temaId, nome, player });
            status = await temaController.Update(temaId, nome, player)
                .then(() => navigation.goBack())
                .catch(error => console.error("Erro ao atualizar tema:", error));
        }

        if (status === true) {
        Alert.alert("Salvo com sucesso");
        setNome('');
        setPlayer('');
        navigation.goBack();
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>{temaId ? 'Editar Tema' : 'Criar Tema'}</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Nome do tema"
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                style={styles.input}
                placeholder="Nome do jogador"
                value={player}
                onChangeText={setPlayer}
            />

            <Button
                title={temaId ? 'Salvar Alterações' : 'Criar'}
                onPress={handleSave}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16, borderRadius: 4 },
});
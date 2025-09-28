import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import TemaController from '../Controller/TemaController';

// 1. Crie a instância do controller fora do componente
const temaController = new TemaController();

export default function CrudTema({ route, navigation }) {
    const [nome, setNome] = useState('');
    const temaId = route.params?.id;

    useEffect(() => {
        if (temaId) {
            // 2. Use a instância e o nome correto do método ('GetUnique')
            temaController.GetUnique(temaId).then(tema => {
                if (tema) setNome(tema.nome);
            }).catch(error => console.error(error));
        }
    }, [temaId]);

    const handleSave = () => {
        if (temaId) {
            // 3. Use a instância, o nome correto ('Update') e passe um único objeto 'model'
            const model = { id: temaId, nome: nome };
            temaController.Update(model).then(() => navigation.goBack());
        } else {
            // 4. Use a instância e o nome correto ('Insert')
            // O controller já cria o model, então podemos passar só o nome
            temaController.Insert(nome).then(() => navigation.goBack());
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
            <Button title={temaId ? 'Salvar Alterações' : 'Criar'} onPress={handleSave} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16, borderRadius: 4 },
});
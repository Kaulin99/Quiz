import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import TemaController from '../Controller/TemaController';
import { useNavigation, useFocusEffect  } from '@react-navigation/native';

// Crie a instância do controller fora do componente
const temaController = new TemaController();

export default function HomeTema() {
    const [temas, setTemas] = useState([]);
    const navigation = useNavigation();

    async function RetriveThemes() {
    const list = await temaController.GetAll();
    setTemas(list ?? []);
    }

    useFocusEffect(
    useCallback(() => {
      async function fetchThemes() {
        await RetriveThemes();
      }
      fetchThemes();
    }, [])
    );

    const handleDelete = (id) => {
        // Use a instância para deletar
        temaController.Delete(id).then(() => {
            setTemas(temas.filter(t => t.id !== id));
        }).catch(error => {
            console.error("Erro ao deletar tema:", error);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Área de temas cadastrados</Text>
            <Button title="Criar Tema" onPress={() => navigation.navigate('CrudTema')} />
            <FlatList
                data={temas}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.temaItem}>
                        <Text style={styles.temaText}>{item.nome}</Text>
                        <View style={styles.actions}>
                            <TouchableOpacity onPress={() => navigation.navigate('CrudTema', { id: item.id })}>
                                <Text style={styles.edit}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                <Text style={styles.delete}>Apagar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

// Seus estilos permanecem os mesmos
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
    temaItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
    temaText: { fontSize: 16 },
    actions: { flexDirection: 'row' },
    edit: { color: 'blue', marginRight: 16 },
    delete: { color: 'red' },
});
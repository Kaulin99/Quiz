import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import TemaController from '../Controller/TemaController';
import { useNavigation, useFocusEffect  } from '@react-navigation/native';
import styles from '../Styles/HomeTema';

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
                    <Text style={styles.temaTitle}>{item.nome}</Text>
                    <Text style={styles.temaSubText}>Feito por: {item.Player}</Text>
                    <Text style={styles.temaSubText}>Jogado {item.TimePlayed} vezes</Text>
                    <View style={styles.actions}>
                        <TouchableOpacity onPress={() => navigation.navigate('HomePergunta', { tema: item })}>
                            <Text style={styles.viewQuestionsText}>Ver Perguntas</Text>
                        </TouchableOpacity>
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
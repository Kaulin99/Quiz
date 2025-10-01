import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import TemaController from '../Controller/TemaController';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import styles from '../Styles/HomeTema';

// Instância do controller fora do componente
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
    temaController.Delete(id)
      .then(() => {
        setTemas(temas.filter((t) => t.id !== id));
      })
      .catch((error) => {
        console.error("Erro ao deletar tema:", error);
      });
  };

<<<<<<< HEAD
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
=======
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Temas Cadastrados</Text>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CrudTema')}
      >
        <Text style={styles.createButtonText}>+ Criar Tema</Text>
      </TouchableOpacity>

      <FlatList
        data={temas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.temaItem}>
            <Text style={styles.temaTitle}>{item.nome}</Text>
            <Text style={styles.temaSubText}>👤 {item.Player}</Text>
            <Text style={styles.temaSubText}>▶️ Jogadas: {item.TimePlayed}</Text>

            <TouchableOpacity
              style={styles.viewQuestionsButton}
              onPress={() =>
                navigation.navigate("HomePergunta", {
                  temaId: item.id,      
                  temaNome: item.nome,   
                })
              }
            >
            <Text style={styles.viewQuestionsText}>Ver Perguntas</Text>
          </TouchableOpacity>


            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate('CrudTema', { id: item.id })}
              >
                <Text style={styles.edit}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.delete}>Apagar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
>>>>>>> d3c00e08fd1cb7462ce0314a1aa30d4da9437a2c

<<<<<<< HEAD
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
=======
import React, { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";
import PerguntaController from "../Controller/PerguntaController";
import styles from "../Styles/HomePergunta";

// instância do controller fora do componente
const perguntaController = new PerguntaController();

export default function HomePergunta() {
  const route = useRoute();
  const navigation = useNavigation();
  const { temaId, temaNome } = route.params || {}; // protege caso route.params seja undefined

  const [perguntas, setPerguntas] = useState([]);

  // Carrega perguntas do tema (corrigido para não retornar Promise direto)
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function loadPerguntas() {
        if (!temaId) {
          console.warn("temaId não definido! Verifique a navegação.");
          return;
        }
        try {
          const list = await perguntaController.GetByTema(temaId);
          if (isActive) {
            setPerguntas(list ?? []);
          }
        } catch (error) {
          console.error("Erro ao carregar perguntas:", error);
        }
      }

      loadPerguntas();

      return () => {
        isActive = false; // cleanup para evitar setState após unmount
      };
    }, [temaId])
  );

  const handleDelete = async (id) => {
    try {
      await perguntaController.Delete(id);
      setPerguntas((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Erro ao deletar pergunta:", error);
    }
  };

  if (!temaId) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>⚠ Tema inválido</Text>
        <Text style={styles.empty}>Não foi possível carregar as perguntas.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📖 Perguntas do Tema</Text>
      <Text style={styles.subTitle}>{temaNome}</Text>

      {/* Botão de adicionar nova pergunta */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("CrudPergunta", { temaId, temaNome })}
      >
        <Text style={styles.addButtonText}>+ Nova Pergunta</Text>
      </TouchableOpacity>

      {/* Lista de perguntas */}
      <FlatList
        data={perguntas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.perguntaItem}>
            <Text style={styles.perguntaText}>{item.pergunta}</Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  navigation.navigate("CrudPergunta", { id: item.id, temaId, temaNome })
                }
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
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma pergunta cadastrada ainda.</Text>
        }
      />
    </View>
  );
>>>>>>> d3c00e08fd1cb7462ce0314a1aa30d4da9437a2c
}
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

  // Carrega perguntas do tema
  const loadPerguntas = useCallback(async () => {
    if (!temaId) {
      console.warn("temaId não definido! Verifique a navegação.");
      return;
    }
    try {
      const list = await perguntaController.GetByTema(temaId);
      setPerguntas(list ?? []);
    } catch (error) {
      console.error("Erro ao carregar perguntas:", error);
    }
  }, [temaId]);

  useFocusEffect(loadPerguntas);

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
}
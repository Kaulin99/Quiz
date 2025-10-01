import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import PerguntaController from '../Controller/PerguntaController';

const perguntaController = new PerguntaController();

export default function CrudPergunta({ route, navigation }) {
  const { temaId, perguntaId } = route.params || {};

  const [pergunta, setPergunta] = useState('');
  const [alternativa1, setAlternativa1] = useState('');
  const [alternativa2, setAlternativa2] = useState('');
  const [alternativa3, setAlternativa3] = useState('');
  const [alternativa4, setAlternativa4] = useState('');
  const [resposta, setResposta] = useState('');

  // Carrega pergunta para edição
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
            setResposta(editor.resposta); // já deixa marcada a correta
          }
        } catch (error) {
          console.error("Erro ao carregar pergunta:", error);
        }
      })();
    }
  }, [perguntaId]);

  async function handleSave() {
    if (!temaId) {
      Alert.alert("Erro Crítico", "Nenhum tema foi selecionado. Volte e tente novamente.");
      return;
    }
    if (!pergunta.trim() || !alternativa1.trim() || !alternativa2.trim() || !alternativa3.trim() || !alternativa4.trim() || !resposta.trim()) {
      Alert.alert("Erro", "Todos os campos são obrigatórios!");
      return;
    }

    const alternativas = [alternativa1.trim(), alternativa2.trim(), alternativa3.trim(), alternativa4.trim()];
    if (!alternativas.includes(resposta.trim())) {
      Alert.alert("Erro de Validação", "A resposta correta deve ser exatamente uma das alternativas.");
      return;
    }

    let status = false;
    if (!perguntaId) {
      status = await perguntaController.Insert(
        pergunta, alternativa1, alternativa2, alternativa3, alternativa4, resposta, temaId
      );
    } else {
      status = await perguntaController.Update(
        perguntaId, pergunta, alternativa1, alternativa2, alternativa3, alternativa4, resposta, temaId
      );
    }

    if (status === true) {
      Alert.alert("Sucesso", "Pergunta salva com sucesso!");
      navigation.goBack();
    }
  };

  const renderAlternativa = (label, value, setter) => (
    <View style={styles.alternativaRow}>
      <TouchableOpacity
        style={[styles.radioCircle, resposta === value && value.trim() !== "" && styles.radioSelected]}
        onPress={() => setResposta(value)}
      />
      <TextInput
        style={styles.input}
        placeholder={label}
        value={value}
        onChangeText={text => {
          setter(text);
          // se eu edito a alternativa que já era a correta, atualizo a resposta também
          if (resposta === value) {
            setResposta(text);
          }
        }}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{perguntaId ? 'Editar Pergunta' : 'Nova Pergunta'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite a pergunta"
        value={pergunta}
        onChangeText={setPergunta}
      />

      {/* Alternativas com botão de seleção */}
      {renderAlternativa("Alternativa 1", alternativa1, setAlternativa1)}
      {renderAlternativa("Alternativa 2", alternativa2, setAlternativa2)}
      {renderAlternativa("Alternativa 3", alternativa3, setAlternativa3)}
      {renderAlternativa("Alternativa 4", alternativa4, setAlternativa4)}

      <Text style={styles.info}>Selecione a alternativa correta tocando no círculo à esquerda.</Text>

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
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16, borderRadius: 4 },
  alternativaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#555",
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioSelected: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  info: { fontSize: 12, color: "#555", marginBottom: 16 },
});
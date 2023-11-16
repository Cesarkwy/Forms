import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuestionnaire } from '../contexts/Context';

const ResultScreen = () => {
  const navigation = useNavigation();
  const { answers, resetAnswers } = useQuestionnaire();

  const positiveQuestionIndices = [0, 3, 4, 5, 6, 7, 8, 9];
  const negativeQuestionIndices = [1, 2];

  // Função para calcular o número de respostas "Sim"
  const countPositiveAnswers = () => {
    return positiveQuestionIndices.filter((index) => answers[index] === 'Sim').length;
  };
 //calcular "Não"
  const countNegativeAnswers = () => {
    return negativeQuestionIndices.filter((index) => answers[index] === 'Não').length;
  };

  // Função para obter o feedback com base nas respostas
  const getFeedback = () => {
    const positiveCount = countPositiveAnswers();
    const negativeCount = countNegativeAnswers();

    const adjustedPositiveCount = positiveCount + negativeCount;

    if (adjustedPositiveCount <= 5) {
      return {
        message: "NÃO É UM CONSUMIDOR CONSCIENTE! É preciso que busque mais informações sobre como suas atitudes podem impactar o meio ambiente e começar uma mudança já!",
        emoji: "😢",
        color: '#EA4335',
      };
    } else if (adjustedPositiveCount <= 7) {
      return {
        message: 'QUASE UM CONSUMIDOR CONSCIENTE NATO! Ainda pode fazer muito mais pelo meio ambiente.',
        emoji: "😐",
        color: '#FBBC05',
      };
    } else if (adjustedPositiveCount <= 9) {
      return {
        message: 'CONSUMIDOR CONSCIENTE QUASE PERFEITO! Você já faz bastante para impactos sociais e ao meio ambiente. Vamos buscar as 10?',
        emoji: "😊",
        color: '#4285F4',
      };
    } else {
      return {
        message: 'PARABÉNS, UM CONSUMIDOR CONSCIENTE NATO! Você é um consumidor totalmente consciente dos impactos sociais e ambientais que seus hábitos de consumo causam.',
        emoji: "🌍",
        color: '#34A853',
      };
    }
  };

  const navigateToHome = () => {
    resetAnswers();
    navigation.navigate('Home');
  };

  const feedback = getFeedback();

  return (
    <View style={styles.container}>
      <Text style={[styles.feedbackText, { color: feedback.color }]}>{feedback.message}</Text>
      <Text style={styles.emoji}>{feedback.emoji}</Text>
      <Text style={styles.thanksText}>MUITO OBRIGADO POR RESPONDER!</Text>
      <TouchableOpacity style={styles.goBackButton} onPress={navigateToHome}>
        <Text style={styles.buttonText}>Voltar ao início</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thanksText:{
    fontSize: 18,
    color: '#34A853'
  },
  feedbackText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
  goBackButton: {
    backgroundColor: '#FBBC05',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  emoji: {
    fontSize: 45,
    marginBottom: 15,
  },
});

export default ResultScreen;
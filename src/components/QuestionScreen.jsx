import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuestionnaire } from '../contexts/Context';
import Modal from 'react-native-modal';


const QuestionScreen = () => {
  const navigation = useNavigation();
  const { answers, updateAnswer } = useQuestionnaire();
  const [showIntroduction, setShowIntroduction] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const introductionTimer = setTimeout(() => {
      setShowIntroduction(false);
    }, 3500);

    return () => clearTimeout(introductionTimer);
  }, []);

// Perguntas
  const questions = [
    'Na casa em que você vive com sua família, nos cômodos em que a luzes ficam acesas por mais de 4 horas, as lâmpadas são econômicas (led)?',
    'Quando você toma banho, você demora mais do que 10 minutos?',
    'Você deixa a torneira aberta ao escovar os dentes?',
    'Na casa ou prédio em que você vive com sua família, a calçada é limpa com vassoura ao invés de água?',
    'Você e sua família dão preferência às frutas e verduras da estação?',
    'Você e sua família consomem produtos orgânicos?',
    'Você e sua família fazem a separação dos materiais recicláveis?',
    'Quando fazem compras, você e sua família dão preferência a materiais com embalagens recicláveis?',
    'Quando você não está usando aparelhos eletrônicos você os desliga?',
    'Você costuma utilizar o verso das folhas de papéis já utilizadas?',
  ];

  const handleResponse = (questionId, response) => {
    updateAnswer(questionId, response);
  };

  const navigateToResults = () => {
    // Verifica se todas as perguntas foram respondidas
    const allQuestionsAnswered = questions.every((_, index) => answers[index]);

    if (allQuestionsAnswered) {
      navigation.navigate('Result');
    } else {
      setIsModalVisible(true);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const navigateBack = () => {
    navigation.goBack();
  };


  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {showIntroduction && (
          <Image
            source={require('../image/Deslizar.png')}
            style={styles.introductionImage}
          />
        )}

        {!showIntroduction &&
          questions.map((question, index) => (
            <View key={index} style={styles.questionContainer}>
              <Text style={styles.questionText}>{`${index + 1}. ${question}`}</Text>
              <View style={styles.responseButtons}>
                <TouchableOpacity
                  style={[
                    styles.responseButton,
                    answers[index] === 'Sim' && styles.selectedButton,
                  ]}
                  onPress={() => handleResponse(index, 'Sim')}
                >
                  <Text style={styles.buttonText}>Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.responseButton,
                    answers[index] === 'Não' && styles.selectedButton,
                  ]}
                  onPress={() => handleResponse(index, 'Não')}
                >
                  <Text style={styles.buttonText}>Não</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

        {!showIntroduction && (
          <>
            <TouchableOpacity style={styles.goToResultsButton} onPress={navigateToResults}>
              <Text style={styles.buttonText}>Ver Resultados</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.goBackButton} onPress={navigateBack}>
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Modal para alerta vermelho */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Por favor, responda todas as perguntas antes de ver os resultados.
              </Text>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  introductionImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain', // ou 'contain-top'
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '50',
    borderRadius: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    color: 'black',
    fontSize: 21,
    marginBottom: 10,
  },
  responseButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  responseButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#4285F4',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'black',
  },
  goBackButton: {
    backgroundColor: '#FBBC05',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  goToResultsButton: {
    backgroundColor: '#34A853',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default QuestionScreen;
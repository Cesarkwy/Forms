import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const handleStartSurvey = () => {
    navigation.navigate('Question');
  };

  const showErrorAlert = () => {
    setIsErrorModalVisible(true);
  };

  const hideErrorAlert = () => {
    setIsErrorModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.appNameContainer}>
      <Text style={styles.appName}>
        <Text style={styles.red}>e</Text>
        <Text style={styles.green}>l</Text>
        <Text style={styles.blue}>g</Text>
        <Text style={styles.yellow}>o</Text>
        <Text style={styles.red}>o</Text>
        <Text style={styles.blue}>g</Text>
      </Text>
      </View>
      <Text style={{ color: 'black', fontSize: 20, marginBottom: 20 }}>Poderia responder algumas perguntas?</Text>
      <TouchableOpacity style={styles.roundButton} onPress={handleStartSurvey}>
        <Text style={styles.buttonText}>Sim</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.roundButton} onPress={showErrorAlert}>
        <Text style={styles.buttonText}>Não</Text>
      </TouchableOpacity>

      {/* Modal de erro personalizado */}
      <Modal isVisible={isErrorModalVisible} onBackdropPress={hideErrorAlert}>
        <View style={styles.errorModal}>
          <Text style={styles.errorText}>VAI RESPONDER SIM!</Text>
          <TouchableOpacity onPress={hideErrorAlert}>
            <Text style={styles.closeButton}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  appNameContainer:{
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'flex-start'
  },
  appName: {
    fontSize: 60,
    fontWeight: 'bold',
    marginTop: 120,
    marginBottom: 50,
  },
  red: {
    color: '#EA4335',
  },
  green: {
    color: '#34A853',
  },
  blue: {
    color: '#4285F4',
  },
  yellow: {
    color: '#FBBC05',
  },

  roundButton: {
    color: 'black',
    backgroundColor: '#4285F4',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    width: '40%',
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },

  errorModal: {
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
    marginBottom: 10,
    fontSize: 20,
  },
  closeButton: {
    color: 'black',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
  },
});

export default HomeScreen;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/components/HomeScreen.jsx';
import QuestionScreen from './src/components/QuestionScreen.jsx';
import ResultScreen from './src/components/ResultScreen.jsx';
import { QuestionnaireProvider } from './src/contexts/Context.jsx';


const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <QuestionnaireProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Question" component={QuestionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Result" component={ResultScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </QuestionnaireProvider>
  );
};

export default App;

import React, { createContext, useContext, useState } from 'react';

const QuestionnaireContext = createContext();

export const QuestionnaireProvider = ({ children }) => {
  const [answers, setAnswers] = useState({});

  const updateAnswer = (questionId, response) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: response,
    }));
  };

  const resetAnswers = () => {
    setAnswers(Array(10).fill(''));
  };

  return (
    <QuestionnaireContext.Provider value={{ answers, updateAnswer, resetAnswers }}>
      {children}
    </QuestionnaireContext.Provider>
  );
};

export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('useQuestionnaire deve ser usado com QuestionnaireProvider');
  }
  return context;
};
import React, { createContext, useState, useContext } from 'react';

const SurveyContext = createContext();

export const SurveyProvider = ({ children }) => {
  const [surveys, setSurveys] = useState([]);

  const addSurvey = (surveyData) => {
    setSurveys(prev => [
      { id: Date.now().toString(), ...surveyData },
      ...prev
    ]);
  };

  const deleteSurvey = (id) => {
    setSurveys(prev => prev.filter(survey => survey.id !== id));
  };

  return (
    <SurveyContext.Provider value={{ surveys, addSurvey, deleteSurvey }}>
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurvey = () => useContext(SurveyContext);

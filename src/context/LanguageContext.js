import React, { createContext, useContext, useState } from "react";
import { languageOptions, dictionaryList } from "../languages";

export const LanguageContext = createContext({
  language: languageOptions[1],
  dictionary: dictionaryList[languageOptions[1].id],
});

const LanguageProvider = (props) => {
  const languageContext = useContext(LanguageContext);
  const [language, setLanguage] = useState(languageContext.language);
  const [dictionary, setDictionary] = useState(languageContext.dictionary);

  const provider = {
    language,
    dictionary,
    setLanguage: (selectedLanguage) => {
      setLanguage(selectedLanguage);
      setDictionary(dictionaryList[selectedLanguage.id]);
    },
  };

  return (
    <LanguageContext.Provider value={provider}>
      {props.children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;

import React, { useState, createContext } from 'react';

export const UrlContext = createContext();

export const UrlContextProvider = (props) => {
  const [urls, setUrls] = useState([]);
  const addUrls = (url) => {
    setUrls([...urls, url]);
  };
  return (
    <UrlContext.Provider value={{ urls, setUrls, addUrls }}>
      {props.children}
    </UrlContext.Provider>
  );
};

import React, {useState} from 'react';
import Route from './components/Route';
import {AuthCont} from './constants/AuthContext';

export default function App() {
  const [userContext, setUserContext] = useState();

  return (
    <AuthCont.Provider value={{userContext, setUserContext}}>
      <Route />
    </AuthCont.Provider>
  );
}

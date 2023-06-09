import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Router from "./src/components/router";
import {createContext, useState} from "react";

export const contextInitialObject = {
  token: "",
  user:"",
  userId: ""
}
export const Context = createContext(null)
export default function App() {
  const [context, setContext] = useState(contextInitialObject)

  return (
      <Context.Provider value={ [context, setContext] }>
        <Router />
      </Context.Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

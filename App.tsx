/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { SafeAreaView } from "react-native";

import NavigationStack from "./app/navigation/NavigationStack";
function App(): JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationStack />
    </SafeAreaView>
  );
}

export default App;

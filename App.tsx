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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF7E7" }}>
      <NavigationStack />
    </SafeAreaView>
  );
}

export default App;

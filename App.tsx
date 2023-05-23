import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import SplashScreen from "react-native-splash-screen";
import NavigationStack from "./app/navigation/NavigationStack";
function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <NavigationStack />
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  safeAreaView: { flex: 1, backgroundColor: "#FFF7E7" },
});

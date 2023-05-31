import React, { useEffect } from "react";
import { Platform, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import SplashScreen from "react-native-splash-screen";
import NavigationStack from "./app/navigation/NavigationStack";
import { Colors } from "./app/utils/colors";
import {
  requestNotificationPermission,
  requestUserPermission,
} from "./app/helper/notificationServices";
function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
    Platform.OS === "ios"
      ? requestUserPermission()
      : requestNotificationPermission();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor={Colors.SECONDARY} barStyle={"dark-content"} />
      <NavigationStack />
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  safeAreaView: { flex: 1, backgroundColor: Colors.SECONDARY },
});

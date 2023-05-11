import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import BhandaraBooking from "../screens/BhandaraBooking";
const Stack = createNativeStackNavigator();

const NavigationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BhandaraBooking" component={BhandaraBooking} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationStack;

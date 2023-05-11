import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import BhandaraBooking from "../screens/BhandaraBooking";
import YatraInfo from "../screens/YatraInfo";
import YatraBooking from "../screens/YatraBooking";
import BhandaraBookingPayment from "../screens/BhandaraBookingPayment";
const Stack = createNativeStackNavigator();

const NavigationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BhandaraBooking" component={BhandaraBooking} />
        <Stack.Screen name="YatraInfo" component={YatraInfo} />
        <Stack.Screen name="YatraBooking" component={YatraBooking} />
        <Stack.Screen
          name="BhandaraBookingPayment"
          component={BhandaraBookingPayment}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationStack;

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import BhandaraBooking from "../screens/BhandaraBooking";
import YatraInfo from "../screens/YatraInfo";
import YatraBooking from "../screens/YatraBooking";
import BhandaraBookingPayment from "../screens/BhandaraBookingPayment";
import InfoScreen from "../screens/InfoScreen";
import AdminLogin from "../screens/AdminLogin";
import AdminBhandara from "../screens/AdminBhandara";
import AdminYatra from "../screens/AdminYatra";
import AdminBookingDetail from "../screens/AdminBookingDetail";
import AdminDonationCollection from "../screens/AdminDonation/AdminDonationCollection";
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
        <Stack.Screen name="InfoScreen" component={InfoScreen} />
        <Stack.Screen name="AdminLogin" component={AdminLogin} />
        <Stack.Screen name="AdminBhandara" component={AdminBhandara} />
        <Stack.Screen name="AdminYatra" component={AdminYatra} />
        <Stack.Screen
          name="AdminDonationCollection"
          component={AdminDonationCollection}
        />

        <Stack.Screen
          name="AdminBookingDetail"
          component={AdminBookingDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationStack;

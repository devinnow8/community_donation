import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import HeaderBar from "../../ReusableComponents/HeaderBar";
import Labels from "../../ReusableComponents/Labels";
import TextInputs from "../../ReusableComponents/TextInputs";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
const AdminYatra = () => {
  const navigation: any = useNavigation();
  const BookingDetail = () => {
    navigation.navigate("AdminBookingDetail");
  };
  return (
    <View style={styles.outerContainer}>
      <HeaderBar hasBackButton={true} headingText="यात्रा बुकिंग" />
      <View style={styles.nameLabel}>
        <Labels labelName="Name" />
      </View>
      <View>
        <TextInputs />
      </View>
      <View style={styles.labelViewStyle}>
        <Labels labelName="Date" />
      </View>
      <View>
        <TextInputs />
      </View>
      <View style={styles.labelViewStyle}>
        <Labels labelName="Onboarding point" />
      </View>
      <View>
        <TextInputs />
      </View>
      <View style={styles.labelViewStyle}>
        <Labels labelName="TIme of Departure" />
      </View>
      <View>
        <TextInputs />
      </View>
      <View style={styles.labelViewStyle}>
        <Labels labelName="Seats" />
      </View>
      <View>
        <TextInputs />
      </View>
      <TouchableOpacity
        style={styles.submitButtonContainer}
        onPress={() => BookingDetail()}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminYatra;

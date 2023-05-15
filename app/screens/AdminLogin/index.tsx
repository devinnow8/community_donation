import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import HeaderBar from "../../ReusableComponents/HeaderBar";
import Labels from "../../ReusableComponents/Labels";
import TextInputs from "../../ReusableComponents/TextInputs";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
const AdminLogin = () => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.adminLoginContainer}>
      <HeaderBar headingText="भंडारा बुकिंग" hasBackButton={true} />
      <View style={styles.idLabelContainer}>
        <Labels labelName="ID नंबर " />
      </View>
      <View>
        <TextInputs />
      </View>
      <View style={styles.passwordContainer}>
        <Labels labelName="पासवर्ड" />
      </View>
      <View>
        <TextInputs />
      </View>
      <TouchableOpacity
        style={styles.btnStyle}
        onLongPress={() => {
          navigation.navigate("AdminYatra");
        }}
        onPress={() => {
          navigation.navigate("AdminBhandara");
        }}
      >
        <Text style={styles.btnTextStyle}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminLogin;

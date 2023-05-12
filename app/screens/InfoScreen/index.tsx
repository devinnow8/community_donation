import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import styles from "./styles";
import HeaderBar from "../../ReusableComponents/HeaderBar";
import { getHeight, getWidth } from "../../utils/pixelConversion";
import { useNavigation } from "@react-navigation/native";

const InfoScreen = () => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <HeaderBar
        headingText="भंडारा बुकिंग"
        hasBackButton={true}
        rightText={"Login"}
        onRightButtonPress={() => {
          navigation.navigate("AdminLogin");
        }}
      />
      <View style={styles.mainImage}>
        <Image source={require("../../assets/images/MainScreenIcon.png")} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.headingText}>
            'सब की सेवा, रब की सेवा' ट्रस्ट
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            marginTop: getHeight(14),
            marginHorizontal: getWidth(35),
          }}
        >
          यह एक लंबा स्थापित तथ्य है कि जब एक पाठक एक पृष्ठ के खाखे को देखेगा तो
          पठनीय सामग्री से विचलित हो जाएगा
        </Text>
      </View>
    </View>
  );
};

export default InfoScreen;

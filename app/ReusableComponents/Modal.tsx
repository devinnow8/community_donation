import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { getHeight, getWidth } from "../utils/pixelConversion";
import { useNavigation } from "@react-navigation/native";
const CustomModal = ({
  isVisible,
  setIsVisible,
  message,
  navigationScreen,
}: any) => {
  const navigation = useNavigation();
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalOuterContainer}>
        <Image source={require("../assets/images/ThanksIcon.png")} />
        <Text style={styles.modalHeadingText}>
          {message ?? "आपकी यात्रा मंगलमय रहे"}
        </Text>
        <TouchableOpacity
          style={styles.modalGreetingButton}
          onPress={() => {
            [setIsVisible(false), navigation.navigate(navigationScreen)];
          }}
        >
          <Text style={styles.modalButtonText}>धन्यवाद!</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalOuterContainer: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingVertical: getHeight(18),
    borderRadius: 10,
  },
  modalHeadingText: {
    fontSize: getHeight(17),
    fontWeight: "600",
    color: "#4B4B4B",
    marginTop: getHeight(13),
  },
  modalGreetingButton: {
    paddingVertical: getHeight(9),
    paddingHorizontal: getWidth(34),
    backgroundColor: "#EB6611",
    borderRadius: 5,
    marginTop: getHeight(17),
  },
  modalButtonText: {
    fontSize: getHeight(22),
    fontWeight: "700",
    color: "#FFF",
  },
});

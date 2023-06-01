import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { getHeight, getWidth } from "../utils/pixelConversion";
import { Colors } from "../utils/colors";
import navigationService from "../helper/navigationService";
const CustomModal = ({
  isVisible,
  setIsVisible,
  title,
  message,
  navigationScreen,
}: any) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalOuterContainer}>
        <Image
          source={require("../assets/images/ThanksIcon.png")}
          style={{ marginBottom: getHeight(13) }}
        />
        {title && <Text style={styles.modalHeadingText1}>{title}</Text>}
        <Text style={styles.modalHeadingText}>
          {message ?? "आपकी यात्रा मंगलमय रहे"}
        </Text>
        <TouchableOpacity
          style={styles.modalGreetingButton}
          onPress={() => {
            [
              setIsVisible(false),
              navigationScreen && navigationService.navigate(navigationScreen),
            ];
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
    backgroundColor: Colors.WHITE,
    alignItems: "center",
    paddingVertical: getHeight(18),
    borderRadius: 10,
  },
  modalHeadingText: {
    fontSize: getHeight(17),
    fontWeight: "600",
    color: Colors.CUSTOM_MODAL_TEXT_COLOR,
  },
  modalGreetingButton: {
    paddingVertical: getHeight(9),
    paddingHorizontal: getWidth(34),
    backgroundColor: Colors.PRIMARY,
    borderRadius: 5,
    marginTop: getHeight(17),
  },
  modalButtonText: {
    fontSize: getHeight(22),
    fontWeight: "700",
    color: Colors.WHITE,
  },
  modalHeadingText1: {
    fontWeight: "700",
    fontSize: 18,
    color: Colors.PRIMARY,
  },
});

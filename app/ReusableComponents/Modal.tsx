import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { getHeight } from "../utils/pixelConversion";

const CustomModal = ({ isVisible, setIsVisible, message }) => {
  return (
    <Modal isVisible={isVisible}>
      <View
        style={{
          backgroundColor: "#FFFFFF",
          alignItems: "center",
          paddingVertical: getHeight(18),
          borderRadius: 10,
        }}
      >
        <Image source={require("../assets/images/ThanksIcon.png")} />
        <Text
          style={{
            fontSize: 17,
            fontWeight: "600",
            color: "#4B4B4B",
            marginTop: 13,
          }}
        >
          {message ?? "आपकी यात्रा मंगलमय रहे"}
        </Text>
        <TouchableOpacity
          style={{
            paddingVertical: 9,
            paddingHorizontal: 34,
            backgroundColor: "#EB6611",
            borderRadius: 5,
            marginTop: 17,
          }}
          onPress={() => {
            setIsVisible(false);
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "700", color: "#FFF" }}>
            धन्यवाद!
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({});

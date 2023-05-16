import { StyleSheet, Text, View, TextInput,TextInputProps } from "react-native";
import React from "react";
import { getHeight, getWidth } from "../utils/pixelConversion";
interface ITextInputFields {
  onChangeText: any;
}

const TextInputs = (props: TextInputProps) => {
  return <TextInput style={[styles.textInputContainers]} {...props} />;
};

export default TextInputs;

const styles = StyleSheet.create({
  textInputContainers: {
    borderWidth: 1,
    height: getHeight(40),
    width: getWidth(307),
    marginHorizontal: getWidth(34),
    borderColor: "#BCBCBC",
    marginTop: getHeight(4),
    padding: getWidth(8),
    borderRadius: getWidth(5),
  },
});

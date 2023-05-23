import { StyleSheet, TextInput, TextInputProps } from "react-native";
import React from "react";
import { getHeight, getWidth } from "../utils/pixelConversion";
import { Colors } from "../utils/colors";
interface ITextInputFields {
  onChangeText: any;
}

const TextInputs = (props: TextInputProps) => {
  return (
    <TextInput
      autoCorrect={false}
      autoCapitalize="none"
      style={[styles.textInputContainers, props?.textInputStyles || {}]}
      {...props}
    />
  );
};

export default TextInputs;

const styles = StyleSheet.create({
  textInputContainers: {
    borderWidth: 1,
    height: getHeight(40),
    width: getWidth(307),
    marginHorizontal: getWidth(34),
    borderColor: Colors.TEXT_INPUT_BORDER_COLOR,
    marginTop: getHeight(4),
    padding: getWidth(8),
    borderRadius: getWidth(5),
    color: Colors.BLACK,
  },
});

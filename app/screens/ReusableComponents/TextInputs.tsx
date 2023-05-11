import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

interface ITextInputFields {
  onChangeText: any;
}

const TextInputs = (props) => {
  return <TextInput style={[styles.textInputContainers]} {...props} />;
};

export default TextInputs;

const styles = StyleSheet.create({
  textInputContainers: {
    borderWidth: 1,
    height: 40,
    width: 307,
    marginHorizontal: 34,
    borderColor: "#BCBCBC",
    marginTop: 4,
  },
});

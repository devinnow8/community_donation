import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface ILabelName {
  labelName: string;
}
const Labels = ({ labelName }: ILabelName) => {
  return (
    <View style={styles.labelContainer}>
      <Text style={styles.labelText}>{labelName}</Text>
    </View>
  );
};

export default Labels;

const styles = StyleSheet.create({
  labelContainer: {
    // marginTop: 10,
    marginLeft: 34,
  },
  labelText: {
    color: "#EB6611",
    fontWeight: "400",
    fontSize: 16,
  },
});

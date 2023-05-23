import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { getWidth, getHeight } from "../utils/pixelConversion";
import { Colors } from "../utils/colors";
interface ILabelName {
  labelName: string;
  labelColor?: any;
}
const Labels = ({ labelName, labelColor }: ILabelName) => {
  return (
    <View style={[styles.labelContainer]}>
      <Text style={[styles.labelText, labelColor && { color: labelColor }]}>
        {labelName}
      </Text>
    </View>
  );
};

export default Labels;

const styles = StyleSheet.create({
  labelContainer: {
    // marginTop: 10,
    marginLeft: getWidth(34),
  },
  labelText: {
    color: Colors.PRIMARY,
    fontWeight: "400",
    fontSize: getHeight(16),
  },
});

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { getHeight, getWidth } from "../utils/pixelConversion";
import { Colors } from "../utils/colors";
const ColorCoding = (props: any) => {
  return (
    <View style={styles.mainContainer}>
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              props.labelText === "Partially Booked"
                ? Colors.GRAY
                : props.labelText === "Available"
                ? Colors.SECONDARY
                : Colors.BLACK,
            borderColor: props.labelText === "Available" ? Colors.PRIMARY : "",
            borderWidth: props.labelText === "Available" ? 1 : 0,
          },
        ]}
      ></View>
      <Text style={styles.textStyle}>{props.labelText}</Text>
    </View>
  );
};

export default ColorCoding;

const styles = StyleSheet.create({
  container: {
    height: getHeight(20),
    width: getWidth(20),
    borderRadius: 8,
  },
  textStyle: { marginLeft: getWidth(5), color: Colors.BLACK },
  mainContainer: {
    marginRight: getWidth(10),
    flexDirection: "row",
    alignItems: "center",
  },
});

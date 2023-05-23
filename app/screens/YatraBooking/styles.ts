import { StyleSheet, Text, View } from "react-native";
import { getHeight, getWidth } from "../../utils/pixelConversion";
import { Colors } from "../../utils/colors";

const styles = StyleSheet.create({
  btnTextStyle: {
    textAlign: "center",
    fontSize: getHeight(18),
    fontWeight: "400",
    color: Colors.WHITE,
  },
  btnStyle: {
    backgroundColor: Colors.PRIMARY,
    marginHorizontal: getWidth(110),
    marginVertical: getHeight(40),
    height: getHeight(40),
    width: getWidth(154),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  errorContainer: {
    marginHorizontal: getWidth(34),
    marginBottom: getHeight(30),
  },
  errorText: { color: Colors.RED },
  bookingDateContainer: {
    marginHorizontal: getWidth(35),
    marginVertical: getHeight(30),
  },
  bookingDateText: {
    fontSize: getHeight(20),
    fontWeight: "400",
  },
});
export default styles;

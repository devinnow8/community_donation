import { StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../utils/pixelConversion";

const styles = StyleSheet.create({
  btnTextStyle: {
    textAlign: "center",
    fontSize: getHeight(18),
    fontWeight: "400",
    color: "#FFFFFF",
  },
  btnStyle: {
    backgroundColor: "#EB6611",
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
  errorText: { color: "red" },
  bookingDateContainer: {
    marginHorizontal: getWidth(35),
    marginVertical: getHeight(30),
  },
  bookingDateText: {
    fontSize: getHeight(20),
    fontWeight: "400",
  },
  textInputContainer: {
    borderWidth: 1,
    height: getHeight(40),
    width: getWidth(307),
    marginHorizontal: getWidth(34),
    borderColor: "#BCBCBC",
    marginTop: getHeight(4),
    padding: getWidth(8),
    borderRadius: getWidth(5),
    justifyContent: "center",
  },
  upDownArrow: {
    position: "absolute",
    height: getHeight(12),
    width: getWidth(12),
    alignSelf: "flex-end",
    right: 20,
  },
  dropDownItemsContainer: {
    padding: 10,
    // borderBottomWidth: 1,
    borderColor: "#BCBCBC",
  },
  dropDownOuterContainer: {
    marginHorizontal: getWidth(34),
    borderWidth: 1,
    borderColor: "#BCBCBC",
    borderBottomLeftRadius: getWidth(5),
    borderBottomRightRadius: getWidth(5),
  },
});
export default styles;

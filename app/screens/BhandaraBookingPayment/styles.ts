import { StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../utils/pixelConversion";

const styles = StyleSheet.create({
  paymentFieldContainer: {
    marginTop: getHeight(35),
  },
  btnTextStyle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "400",
    color: "#EB6611",
  },
  btnStyle: {
    marginHorizontal: getWidth(110),

    height: getHeight(45),
    width: getWidth(93),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "#EB6611",
    borderWidth: 1,
  },
  moneyButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: getWidth(30),

    marginTop: getHeight(40),
  },
  payBtnStyle: {
    marginHorizontal: getWidth(110),
    marginVertical: getHeight(40),
    height: getHeight(50),
    width: getWidth(146),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "#EB6611",
    borderWidth: 1,
  },
  errorContainer: {
    marginHorizontal: getWidth(34),
  },
  PayingButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: getWidth(30),
  },
});
export default styles;

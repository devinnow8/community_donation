import { StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../utils/pixelConversion";

const styles = StyleSheet.create({
  btnStyle: {
    // backgroundColor: "#EB6611",
    marginHorizontal: getWidth(110),
    marginVertical: getHeight(40),
    width: getWidth(154),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: getHeight(8),
    borderColor: "#EB6611",
    borderWidth: 1,
  },
  btnTextStyle: {
    textAlign: "center",
    fontSize: getHeight(18),
    fontWeight: "700",
    color: "#EB6611",
  },
  adminLoginContainer: { flex: 1, backgroundColor: "#FFF" },
  idLabelContainer: { marginTop: getHeight(35) },
  passwordContainer: { marginTop: getHeight(20) },
  adminLoginButtonView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  adminButtonView: {
    width: getWidth(130),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: getHeight(8),
    borderWidth: 1,
    borderColor: "#EB6611",
  },
  errMsgContainer: {
    marginHorizontal: getWidth(35),
    marginTop: getHeight(10),
  },
  errMsgText: {
    color: "red",
  },
});
export default styles;

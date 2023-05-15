import { StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../utils/pixelConversion";

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: "#EB6611",
    marginHorizontal: getWidth(110),
    marginVertical: getHeight(40),
    width: getWidth(154),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: getHeight(8),
  },
  btnTextStyle: {
    textAlign: "center",
    fontSize: getHeight(18),
    fontWeight: "700",
    color: "#FFFFFF",
  },
  adminLoginContainer: { flex: 1, backgroundColor: "#FFF" },
  idLabelContainer: { marginTop: getHeight(35) },
  passwordContainer: { marginTop: getHeight(20) },
});
export default styles;

import { StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../utils/pixelConversion";
import { Colors } from "../../utils/colors";

const styles = StyleSheet.create({
  btnStyle: {
    // backgroundColor: Colors.PRIMARY,
    marginHorizontal: getWidth(110),
    marginVertical: getHeight(40),
    width: getWidth(154),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: getHeight(8),
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
  },
  btnTextStyle: {
    textAlign: "center",
    fontSize: getHeight(18),
    fontWeight: "700",
    color: Colors.PRIMARY,
  },
  adminLoginContainer: { flex: 1, backgroundColor: Colors.WHITE },
  idLabelContainer: { marginTop: getHeight(35) },
  passwordContainer: { marginTop: getHeight(20) },
  loggedInView: { marginTop: 20 },
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
    borderColor: Colors.PRIMARY,
  },
  errMsgContainer: {
    marginHorizontal: getWidth(35),
    marginTop: getHeight(10),
  },
  errMsgText: {
    color: Colors.RED,
  },
  adminDonationButtonView: {
    // width: getWidth(30),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: getHeight(8),
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  adminDonationBtnOuterContainer: {
    marginVertical: getHeight(30),
    marginHorizontal: getWidth(40),
  },
});
export default styles;
